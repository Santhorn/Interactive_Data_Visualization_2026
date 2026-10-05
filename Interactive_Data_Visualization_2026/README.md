# Interactive Data Visualization Project — 2026

## 1. โจทย์และวัตถุประสงค์
โครงงานนี้พัฒนาจากชุดข้อมูลสถิติผู้เสียชีวิตจากเหตุที่เกี่ยวข้องกับยานพาหนะ ปี 2026 โดยผ่านการทำความสะอาด วิเคราะห์ และนำเสนอเป็น Interactive Data Visualization ตามกรอบงานสอบรายวิชา Data Visualization Technology

วัตถุประสงค์หลักคือฝึก Data Cleaning, Data Visualization ด้วย HTML/CSS/JavaScript, Git/GitHub และการ Deployment ตามข้อกำหนดของอาจารย์

## 2. Dataset
- Raw: 4,482 records × 21 columns
- Cleaned: 4,482 records × 15 columns
- ช่วงวันที่ในข้อมูล: 1 มกราคม 2026 – 31 มีนาคม 2026
- มี 77 จังหวัด
- ใช้ไฟล์ UTF-8/UTF-8-SIG
- ข้อมูลเป็นข้อมูลสถิติ ไม่มีการนำข้อมูลส่วนบุคคลมาแสดงบน Dashboard

## 3. Data Cleaning
1. ตัด `DEAD_YEAR_TH` เพราะซ้ำความหมายกับ `DEAD_YEAR_EN`
2. ตัด `Date Rec`, `Time Rec`, `RiskHelmet`, `RiskSafetyBelt`, `Tumbol` เพราะว่างทั้งคอลัมน์
3. ค่า Age ที่เป็นค่าติดลบ เช่น `-1` เปลี่ยนเป็น missing และไม่เดาค่าแทน
4. Missing ของ `Nationality`, `ICD_10`, `Acc_Sub_Dist` แทนด้วย `ไม่ระบุ`
5. เติม `District` จาก `Acc_District` เมื่อว่าง
6. เติม `Province` จาก `Dead_Prov` เมื่อว่าง
7. แปลง `DeadDate_EN` เป็นรูปแบบ `d/m/YYYY`
8. ไม่สร้างข้อมูลเวลาใหม่ เพราะ `Time Rec` ว่างทั้งหมด

## 4. Visualization
สร้างเว็บ 2 เวอร์ชันตามข้อกำหนด framework:
- `web/d3/` — D3.js
- `web/chartjs/` — Chart.js

แต่ละเวอร์ชันมีอย่างน้อย 4 รูปแบบกราฟ ได้แก่ line chart, bar chart, horizontal bar chart และ doughnut/pie chart พร้อม tooltip และ filter

## 5. Interactivity
- Filter เดือน
- Filter เพศ
- Filter จังหวัด
- Filter พาหนะ
- Filter วันในสัปดาห์
- Tooltip
- Reset filter
- Responsive layout

## 6. ข้อมูลที่ไม่ถูกนำเสนอ
การวิเคราะห์ตามเวลา/ชั่วโมงถูกตัดออกจาก Dashboard เนื่องจากไม่มีข้อมูลเวลาเกิดเหตุที่เชื่อถือได้ใน Dataset
เดือนที่ไม่มีข้อมูลจะไม่แสดงในตัวเลือกหรือกราฟ

## 7. โครงสร้าง Repository
```text
/data/raw/_2026.csv
/data/cleaned/_2026_cleaned.csv
/analysis/clean_data.py
/web/d3/index.html
/web/d3/style.css
/web/d3/script.js
/web/d3/_2026_cleaned.csv
/web/chartjs/index.html
/web/chartjs/style.css
/web/chartjs/script.js
/web/chartjs/_2026_cleaned.csv
/report/Process_Report.pdf
README.md
PROMPTS.md
```

## 8. วิธีใช้งาน
แนะนำ VS Code + Live Server แล้วเปิด `index.html` หรือเปิด `web/d3/index.html` / `web/chartjs/index.html`

สำหรับ GitHub Pages ให้ตั้ง Repository เป็น Public และเลือก Settings → Pages → Deploy from branch → main/root

## 9. AI / GPT Transparency
ใช้ ChatGPT ช่วยวางโครงสร้าง Dashboard, เขียน/แก้ HTML, CSS, JavaScript, ตรวจแนวทาง Data Cleaning และจัดทำเอกสาร โดยผู้จัดทำต้องตรวจสอบข้อมูลจริงและสามารถอธิบายโค้ด/ผลลัพธ์ได้ทุกส่วน ตามกติกาการใช้ AI ของรายวิชา

## 10. Source / Attribution
Visualization libraries ใช้ D3.js และ Chart.js ผ่าน CDN ตามเอกสารของ library และใช้ข้อมูลจากไฟล์ Dataset ที่ผู้จัดทำได้รับสำหรับการสอบ
