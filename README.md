# libGost28147-89.js

Библиотека реализует шифрование текста в формате unicode
алгоритмом ГОСТ 28147-89 в режиме простой замены

# Инициализация
var EncryptedMessage = new classGost2814789('<8-ми символьный ключ шифрования>'); 

# Зашифрование
var encrStr = EncryptedMessage.crypt('Привет Мир!','encrypt');

# Выработка имитовставки
var authStr = EncryptedMessage.crypt('авторизация','authcode'); 

# Геттер-сеттер ключа шифрования
EncryptedMessage.encryptionKey(key); 
