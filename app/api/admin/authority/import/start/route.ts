import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { createImportJob, updateImportJob } from "@/lib/authority/db";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { state } = body;

    if (!state || typeof state !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid state parameter" },
        { status: 400 }
      );
    }

    const jobId = await createImportJob(state.toLowerCase());

    // Run the import script as a detached background process.
    const scriptPath = path.join(process.cwd(), "scripts", "import-state.ts");
    const child = spawn(
      process.platform === "win32" ? "npx.cmd" : "npx",
      ["tsx", scriptPath, state.toLowerCase()],
      {
        detached: true,
        stdio: "ignore",
        cwd: process.cwd(),
      }
    );
    child.unref();

    await updateImportJob(jobId, { status: "running" });

    return NextResponse.json({ success: true, jobId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
