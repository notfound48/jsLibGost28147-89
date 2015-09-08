# libGost28147-89.js

Библиотека реализует шифрование открытого текста алгоритмом ГОСТ 28147-89 в режиме простой замены

var EncryptedMessage = new classGost2814789('<ключ шифрования>'); // Инициализация (ключ шифрования 8 символов)

var encrStr = EncryptedMessage.crypt('Привет Мир!','encrypt'); // Зашифрование

var authStr = EncryptedMessage.crypt('авторизация','authcode'); // Выработка имитовставки

var decStr = EncryptedMessage.crypt(EncryptedMessage.crypt('Привет Мир!','encrypt'),'decrypt'); // Зашифрование - расшифрование
