# libGost28147-89.js

Библиотека реализует шифрование открытого текста по ГОСТ 28147-89 в режиме блочного шифра.

Пример использования:

var EncryptedMessage = new classGost2814789('qwertyui');

EncryptedMessage.crypt('Привет Мир!', 'encrypt'));  // Зашифрование текста
EncryptedMessage.crypt('Авторизация', 'authcode')); // Выработка имитовставки
EncryptedMessage.crypt(EncryptedMessage.crypt('Привет Мир!', 'encrypt'), 'decrypt'));  // Зашифрование - Расшифрование теска
