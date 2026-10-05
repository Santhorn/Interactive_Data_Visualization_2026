fetch('./_2026_cleaned.csv')
  .then(r => r.text())
  .then(t => {
    data = csv(t).map(enrich);

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
  .catch(err => {
    console.error('CSV ERROR:', err);
  });
