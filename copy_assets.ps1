# PowerShell script to reliably copy static files to the public folder
$source = 'd:\Downlaods Folder\workden_address_v2\workden_redesign\'
$dest   = 'd:\Downlaods Folder\workden_address_v2\workden_redesign\react_app\public\'

# Ensure destination exists
if (-Not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force }

# Use Robocopy for robust copying, excluding node_modules, .next build artifacts, and react_app directory
robocopy $source $dest /E /XF *.log *.cmd /XD node_modules .next react_app
