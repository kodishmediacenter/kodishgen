# Instalando Bluetooth
sudo pacman -S bluez bluez-utils blueman
sudo echo  '' > /etc/bluetooth/main.conf 
sudo echo  'AutoEnable=true' >> /etc/bluetooth/main.conf
sudo systemctl start bluetooth
sudo systemctl enable bluetooth

 
#Habilitando Serviços Essenciais
sudo systemctl enable lightdm.service
# Instalando flatpaks
sudo flatpak install flathub com.obsproject.Studio -y 
sudo flatpak install flathub com.stremio.Stremio -y 
sudo flatpak install flathub org.chromium.Chromium -y

# Instalando Flex Laucher

wget https://github.com/complexlogic/flex-launcher/releases/download/v2.1/flex-launcher-2.1-1-x86_64.pkg.tar.zst
sudo pacman -U flex-launcher-2.1-1-x86_64.pkg.tar.zst

# Deixar Arch Linux em PT_BR
sudo echo '' >> /etc/locale.gen
sudo locale-gen
sudo echo 'pt_BR.UTF-8 UTF-8' >> /etc/locale.gen
sudo export LANG=pt_BR.UTF-8

# Removendo apps 
sudo pacman -Rs xfce4-dict 
sudo pacman -Rs ristretto 
sudo pacman -Rs parole
