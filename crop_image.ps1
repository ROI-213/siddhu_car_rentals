Add-Type -AssemblyName System.Drawing
$imgPath = 'c:\Users\LENOVO\Downloads\SIDDHU_CAR_RENTALS\public\images\premium_fleet_v2.jpg'
$img = [System.Drawing.Image]::FromFile($imgPath)
$cropHeight = [math]::Round($img.Height * 0.81)
$cropRect = New-Object System.Drawing.Rectangle(0, 0, $img.Width, $cropHeight)
$bmp = New-Object System.Drawing.Bitmap($cropRect.Width, $cropRect.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$img.Dispose()
$g.Dispose()
$bmp.Save($imgPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Host 'Image cropped successfully.'
