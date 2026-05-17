$inputDir = "./combined"
$outputDir = "./public/headers/png"

# Mapping: combined filename → array of jurisdiction codes
$mapping = @{
    "AL-AK.png" = @("AL", "AK")
    "AZ-AR.png" = @("AZ", "AR")
    "BC-AB.png" = @("BC", "AB")
    "CA-CO.png" = @("CA", "CO")
    "CT-DL.png" = @("CT", "DL")
    "FL-GA.png" = @("FL", "GA")
    "HI-ID.png" = @("HI", "ID")
    "IA-KS.png" = @("IA", "KS")
    "IL-IN.png" = @("IL", "IN")
    "KY-LA.png" = @("KY", "LA")
    "MA-MI.png" = @("MA", "MI")
    "ME-MD.png" = @("ME", "MD")
    "MN-MS.png" = @("MN", "MS")
    "MO-MT.png" = @("MO", "MT")
    "NC-ND.png" = @("NC", "ND")
    "NE-NV.png" = @("NE", "NV")
    "NH-NJ.png" = @("NH", "NJ")
    "NL-YT.png" = @("NL", "YT")
    "NM-NY.png" = @("NM", "NY")
    "NS-PEI.png" = @("NS", "PEI")
    "NT-NU.png" = @("NT", "NU")
    "OR-PA.png" = @("OR", "PA")
    "QB-NB.png" = @("QB", "NB")
    "RI-SC.png" = @("RI", "SC")
    "SD-TN.png" = @("SD", "TN")
    "TN-TX.png" = @("TN", "TX")
    "VT-VA.png" = @("VT", "VA")
    "WA-WV.png" = @("WA", "WV")
    "WI-WY.png" = @("WI", "WY")
}

foreach ($entry in $mapping.GetEnumerator()) {
    $file = $entry.Key
    $codes = $entry.Value

    $inputPath = Join-Path $inputDir $file

    # Load image to get dimensions
    $img = [System.Drawing.Image]::FromFile($inputPath)
    $width = $img.Width
    $height = $img.Height
    $half = [int]($height / 2)

    # Top half
    $bmpTop = New-Object System.Drawing.Bitmap($width, $half)
    $gTop = [System.Drawing.Graphics]::FromImage($bmpTop)
    $rectTop = New-Object System.Drawing.Rectangle @(0, 0, $width, $half)
    $gTop.DrawImage($img, $rectTop, $rectTop, [System.Drawing.GraphicsUnit]::Pixel)
    $bmpTop.Save((Join-Path $outputDir ($codes[0] + ".png")), "Png")

    # Bottom half
    $bmpBottom = New-Object System.Drawing.Bitmap($width, $half)
    $gBottom = [System.Drawing.Graphics]::FromImage($bmpBottom)
    $rectBottomSrc = New-Object System.Drawing.Rectangle @(0, $half, $width, $half)
    $rectBottomDest = New-Object System.Drawing.Rectangle @(0, 0, $width, $half)
    $gBottom.DrawImage($img, $rectBottomDest, $rectBottomSrc, [System.Drawing.GraphicsUnit]::Pixel)
    $bmpBottom.Save((Join-Path $outputDir ($codes[1] + ".png")), "Png")

    Write-Host "Split $file → $($codes[0]).png + $($codes[1]).png"
}