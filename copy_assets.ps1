# PowerShell script to reliably copy static files to the public folder
$source = 'd:\Downlaods Folder\workden_address_v2\workden_redesign'
$dest   = 'd:\Downlaods Folder\workden_address_v2\workden_redesign\react_app\public'

# Ensure destination exists
if (-Not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force }

# Copy files excluding react_app and standard dev folders
Get-ChildItem -Path $source -Exclude "react_app", "node_modules", ".next" | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
}

Write-Output "✅ Static assets copied successfully to Next.js public folder!"
