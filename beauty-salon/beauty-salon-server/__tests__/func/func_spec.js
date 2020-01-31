const {createMainBody, processingBg, createPageHeader} = require('../../utils');
test('render main body', async () => {
    expect(await createMainBody()).toBeTruthy()
});
test('render main page header', async () => {
    expect(await createPageHeader('/main')).toBeTruthy()
});

test ('process bg undefined', async () => {
    expect(await processingBg('../public/images/beauty_salon_bg.png')).toBeUndefined()
});

