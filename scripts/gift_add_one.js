(async () => { const vis = (e) => e.getBoundingClientRect().width > 0;
[...document.querySelectorAll('button')].filter(vis).find(b => /Thêm tài khoản ngân hàng/.test(b.innerText)).click();
await new Promise(r => setTimeout(r, 400));
[...document.querySelectorAll('.bank-btn-save')].filter(vis)[0].click(); return 'added'; })()
