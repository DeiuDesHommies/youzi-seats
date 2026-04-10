#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).parent
PERSONAS = ["chen-xiaoqun", "zhangmengzhu", "chaogu-yangjia", "zuoshou-xinyi"]


def require(condition, message):
    if not condition:
        raise SystemExit(message)


for persona in PERSONAS:
    base = ROOT / "skills" / persona
    require((base / "skill.md").exists(), f"missing skill.md for {persona}")
    require((base / "metadata.json").exists(), f"missing metadata.json for {persona}")
    require((base / "evidence" / "sources.json").exists(), f"missing sources.json for {persona}")
    require((base / "cases" / "cases.json").exists(), f"missing cases.json for {persona}")

    metadata = json.loads((base / "metadata.json").read_text())
    sources = json.loads((base / "evidence" / "sources.json").read_text())
    cases = json.loads((base / "cases" / "cases.json").read_text())

    require(metadata.get("corePatterns"), f"missing corePatterns for {persona}")
    require(metadata.get("claimProvenance"), f"missing claimProvenance for {persona}")
    require(len(metadata["corePatterns"]) == len(metadata["claimProvenance"]), f"claimProvenance mismatch for {persona}")
    require(len(cases) >= 1, f"no cases for {persona}")
    require(len(sources) >= 2 or persona == "zuoshou-xinyi", f"insufficient sources for {persona}")
    for mapping in metadata["claimProvenance"]:
        require(isinstance(mapping, list) and mapping, f"empty claim provenance mapping for {persona}")
        for index in mapping:
            require(0 <= index < len(sources), f"out-of-range provenance index for {persona}")

    if metadata.get("launch"):
        require(len(cases) >= 2, f"launch persona must have at least 2 cases: {persona}")
        require(len(sources) >= 3, f"launch persona must have at least 3 sources: {persona}")

print("validation_ok")
