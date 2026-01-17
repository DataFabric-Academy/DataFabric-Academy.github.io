# กำหนดค่า Path (อ้างอิงจากโครงสร้างของคุณ)
$OBS_DOCS = "D:\Obsidian\Knowledge-Fabric-Vault\90_Academy\main-portal"
$OBS_ASSETS = "D:\Obsidian\Knowledge-Fabric-Vault\90_Academy\_assets\assets-main"

$DEV_DOCS = ".\docs"
$DEV_IMAGES = ".\static\img"

# Mirroring ด้วย Robocopy (Physical Sync เพื่อให้ Git เห็นไฟล์จริง)
robocopy $OBS_DOCS $DEV_DOCS /MIR /FFT /R:1 /W:1 /NDL /NJH /NJS /nc /ns /np
robocopy $OBS_ASSETS $DEV_IMAGES /MIR /FFT /R:1 /W:1 /NDL /NJH /NJS /nc /ns /np

# จบแค่การ Mirror ไม่ต้องใส่คำสั่ง git push ที่นี่