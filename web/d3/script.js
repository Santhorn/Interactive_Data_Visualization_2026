function render(){
  let a=filt(),
      ages=a.map(r=>r.age).filter(Number.isFinite),
      avg=ages.length?ages.reduce((x,y)=>x+y,0)/ages.length:0;

  $('total').textContent=a.length.toLocaleString();
  $('age').textContent=ages.length?avg.toFixed(1)+' ปี':'-';
  $('ageBig').textContent=ages.length?avg.toFixed(1)+' ปี':'-';
  $('male').textContent=a.filter(r=>r.sex==='ชาย').length.toLocaleString();
  $('provCount').textContent=new Set(a.map(r=>r.province)).size;
  $('topVehicle').textContent=counts(a,'vehicle')[0]?.[0]||'-';
  $('status').textContent=`แสดง ${a.length.toLocaleString()} จาก ${data.length.toLocaleString()} รายการ`;

  lineChart(
    '#monthly',
    counts(a,'m').sort((x,y)=>x[0]-y[0])
  );

  donut(
    '#sexChart',
    counts(a,'sex')
  );

  svgBar(
    '#vehicleChart',
    counts(a,'vehicle'),
    true,
    colors.vehicle
  );

  svgBar(
    '#provinceChart',
    counts(a,'province').slice(0,15),
    true,
    colors.province
  );

  svgBar(
    '#weekdayChart',
    counts(a,'w')
      .sort((x,y)=>x[0]-y[0])
      .map(x=>[days[x[0]],x[1]]),
    false,
    colors.weekday
  );
}


/* =========================
   LOAD CSV
   ========================= */

fetch('/Interactive_Data_Visualization_2026/web/d3/_2026_cleaned.csv')
  .then(r=>{
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.text();
  })
  .then(t=>{
    data=csv(t).map(enrich);

    /* เติมตัวเลือกเดือน */
    fill(
      'month',
      months.map((m,i)=>[i,m])
    );

    /* เติมตัวเลือกเพศ */
    fill(
      'sex',
      uniq(data.map(r=>r.sex))
    );

    /* เติมตัวเลือกจังหวัด */
    fill(
      'province',
      uniq(data.map(r=>r.province))
    );

    /* เติมตัวเลือกพาหนะ */
    fill(
      'vehicle',
      uniq(data.map(r=>r.vehicle))
    );

    /* เติมตัวเลือกวัน */
    fill(
      'weekday',
      days.map((d,i)=>[i,d])
    );

    /* ตั้งค่าเดือนให้แสดงชื่อภาษาไทย */
    $('month').innerHTML=
      '<option value="">ทั้งหมด</option>'+
      months.map((m,i)=>`<option value="${i}">${m}</option>`).join('');

    /* ตั้งค่าวันให้แสดงชื่อภาษาไทย */
    $('weekday').innerHTML=
      '<option value="">ทั้งหมด</option>'+
      days.map((d,i)=>`<option value="${i}">${d}</option>`).join('');

    /* เมื่อเปลี่ยนตัวกรองให้วาดกราฟใหม่ */
    ['month','sex','province','vehicle','weekday'].forEach(id=>{
      $(id).addEventListener('change',render);
    });

    /* แสดงข้อมูลครั้งแรก */
    render();
  })
  .catch(err=>{
    console.error(err);

    $('status').textContent=
      `โหลด CSV ไม่สำเร็จ (${err.message})`;

    console.error(
      'ตรวจสอบไฟล์: /Interactive_Data_Visualization_2026/web/d3/_2026_cleaned.csv'
    );
  });
