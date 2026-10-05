import pandas as pd
from pathlib import Path
raw = pd.read_csv(Path(__file__).parents[1]/"data/raw/_2026.csv")
out = raw.copy()
# Remove columns that are redundant or entirely empty.
remove = ["DEAD_YEAR_TH","Date Rec","Time Rec","RiskHelmet","RiskSafetyBelt","Tumbol"]
remove = [c for c in remove if c in out.columns]
out = out.drop(columns=remove)
# Replace negative age with missing; do not invent age.
out.loc[pd.to_numeric(out["Age"], errors="coerce") < 0, "Age"] = pd.NA
# Fill categorical missing values consistently.
for c in ["Nationality","ICD_10","Acc_Sub_Dist"]:
    if c in out: out[c] = out[c].fillna("ไม่ระบุ")
if "District" in out and "Acc_District" in out:
    out["District"] = out["District"].fillna(out["Acc_District"])
if "Province" in out and "Dead_Prov" in out:
    out["Province"] = out["Province"].fillna(out["Dead_Prov"])
# Standardize date to d/m/YYYY.
dt = pd.to_datetime(out["DeadDate_EN"], errors="coerce")
out["DeadDate_EN"] = dt.dt.strftime("%-d/%-m/%Y")
out.to_csv(Path(__file__).parents[1]/"data/cleaned/_2026_cleaned.csv",index=False,encoding="utf-8-sig")
print(out.shape)
