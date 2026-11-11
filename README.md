# 🚀 En Enterprise - Facebook 24/7 Auto Post & Bump (GitHub Actions)

ระบบโพสต์สินค้าอัตโนมัติ 15 กลุ่มต่อวัน และโพสต์ข่าวสาร มข. 2 รอบต่อวัน ทำงานฟรีตลอด 24 ชั่วโมงบน GitHub Actions โดยที่คุณสามารถ **ปิดคอมพิวเตอร์ได้ 100%**

---

## 📋 คุณสมบัติระบบ
1. **หมุนเวียนสินค้าครบ 7 รายการตามแคตตาล็อกหน้าเว็บ:**
   - พระวิษณุกรรมมอดินแดง องค์กะทัดรัด (200 บาท)
   - หนังสือเคล็ดลับ EdPEx (249 บาท)
   - เหรียญที่ระลึกครบรอบคณะวิศวะ มข. (250 บาท)
   - พระวิษณุกรรมมอดินแดง รุ่น 1 องค์เล็ก ขนาดห้อยคอ (500 บาท)
   - พระวิษณุกรรม องค์ใหญ่ หน้าตัก 7/9 นิ้ว (34,999 บาท)
   - เสื้อโปโล KKU Engineers (500 บาท)
   - เหรียญหลวงปู่ศิลา สิริจันโท รุ่นรวยยอดสุด (500-2,000 บาท)
2. **โพสต์ลง 15 กลุ่มเป้าหมายต่อวัน (ทุกชั่วโมง 08:00 - 22:00 น.)**
3. **ระบบดันโพสต์ (Bump Post):** คอมเมนต์ทันที 1 ข้อความเพื่อขึ้นอันดับ 1 ของกลุ่ม
4. **บันทึกภาพหลักฐาน (Screenshots Proofs):** เก็บเข้าแท็บ Artifacts บน GitHub ตรวจสอบได้ตลอดเวลา
5. **ฟรี 100%:** รันบน GitHub Actions เดือนละประมาณ 240 นาที จากโควตาฟรี 2,000 นาที

---

## 🛠️ ขั้นตอนการนำขึ้น GitHub (ทำครั้งเดียว):

### ขั้นที่ 1: สร้าง Private Repository บน GitHub
1. ไปที่ [https://github.com/new](https://github.com/new)
2. ตั้งชื่อ Repository เช่น: `en-enterprise-autopost`
3. **สำคัญมาก:** เลือกเป็น **Private** (เพื่อความปลอดภัยของคุกกี้และรหัสผ่าน)
4. กด **Create repository**

### ขั้นที่ 2: อัปโหลดโฟลเดอร์นี้ขึ้น GitHub
เปิด Terminal ในโฟลเดอร์นี้ แล้วรันคำสั่ง:
```bash
git init
git add .
git commit -m "feat: initial commit 24/7 autoposter"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/en-enterprise-autopost.git
git push -u origin main
```

### ขั้นที่ 3: ใส่คุกกี้ Facebook ใน GitHub Secrets
1. ในหน้า Repo บน GitHub ไปที่: **Settings** -> **Secrets and variables** -> **Actions**
2. กดปุ่ม **New repository secret**
3. ตั้งชื่อ Secret Name: `FB_COOKIES`
4. วาง JSON Cookies ของ Facebook ลงในช่อง Secret Value แล้วกด **Add secret**

---

### 🎉 ระบบจะเริ่มทำงานตามรอบเวลาอัตโนมัติทันที แม้คุณจะปิดคอมพิวเตอร์!
