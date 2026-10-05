fetch('./_2026_cleaned.csv')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.text();
  })
  .then(text => {
    console.log('CSV loaded:', text.length, 'characters');

    data = csv(text).map(enrich);

    console.log('Data loaded:', data.length, 'rows');
    console.log('First row:', data[0]);

    const pm = [...new Set(
      data.map(r => r.m).filter(Number.isInteger)
    )].sort((a,b) => a-b);

    $('month').innerHTML =
      '<option value="">ทั้งหมด</option>' +
      pm.map(m =>
        `<option value="${m}">${months[m]}</option>`
      ).join('');

    fill('sex', uniq(data.map(r => r.sex)));
    fill('province', uniq(data.map(r => r.province)));
    fill('vehicle', uniq(data.map(r => r.vehicle)));

    const pd = [...new Set(
      data.map(r => r.w).filter(Number.isInteger)
    )].sort((a,b) => a-b);

    $('weekday').innerHTML =
      '<option value="">ทั้งหมด</option>' +
      pd.map(i =>
        `<option value="${i}">${days[i]}</option>`
      ).join('');

    render();
  })
  .catch(error => {
    console.error('CSV ERROR:', error);
    $('status').textContent =
      'โหลดข้อมูลไม่สำเร็จ: ' + error.message;
  });

['month','sex','province','vehicle','weekday']
  .forEach(id => $(id).onchange = render);

$('reset').onclick = () => {
  ['month','sex','province','vehicle','weekday']
    .forEach(id => $(id).value = '');

  render();
};
