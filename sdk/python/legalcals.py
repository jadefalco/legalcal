"""
LegalCals Enterprise SDK — Python
Auto-generated from OpenAPI spec
"""

import requests


class LegalCalsClient:
    def __init__(self, api_key: str, base_url: str = "https://legalcals.com/api/v1"):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "x-legalcals-key": self.api_key,
        })

    def getIntelligence(self, body: dict = None):
        url = f"{self.base_url}/intelligence"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getReasoning(self, body: dict = None):
        url = f"{self.base_url}/reasoning"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getChecklist(self, body: dict = None):
        url = f"{self.base_url}/checklist"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getRisk(self, body: dict = None):
        url = f"{self.base_url}/risk"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getHeatmap(self, body: dict = None):
        url = f"{self.base_url}/heatmap"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getSimilarityMatrix(self, body: dict = None):
        url = f"{self.base_url}/similarity/matrix"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getSimilarityClusters(self, body: dict = None):
        url = f"{self.base_url}/similarity/clusters"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getJurisdictionTrends(self, body: dict = None):
        url = f"{self.base_url}/trends/jurisdiction"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getNationalTrends(self, body: dict = None):
        url = f"{self.base_url}/trends/national"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getJurisdictionForecast(self, body: dict = None):
        url = f"{self.base_url}/forecast/jurisdiction"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getNationalForecast(self, body: dict = None):
        url = f"{self.base_url}/forecast/national"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getQuarterlyReport(self, body: dict = None):
        url = f"{self.base_url}/reports/quarterly"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def getAnnualReport(self, body: dict = None):
        url = f"{self.base_url}/reports/annual"
        response = self.session.post(url, json=body or {})
        response.raise_for_status()
        return response.json()

    def listTopics(self):
        url = f"{self.base_url}/topics"
        response = self.session.get(url)
        response.raise_for_status()
        return response.json()

    def getTopicCoverage(self, topic: str):
        url = f"{self.base_url}/topics/{topic}/coverage"
        response = self.session.get(url)
        response.raise_for_status()
        return response.json()


__all__ = ["LegalCalsClient"]
