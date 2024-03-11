const loginValidator = {
    validateMail: (email) => {
        // Expresión regular para validar el formato del correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    validateLength: (string, min, max) => {
        return string.length >= min && string.length <= max
    },
    validateSpecialChars: (string) => {
        const caracteresEspeciales = ".-_,;{}´¨+-*/!$%&#?¿'";
        for (let i = 0; i < caracteresEspeciales.length; i++) {
            if (string.includes(caracteresEspeciales[i])) {
                return true;
            }
        }
        return false; // Si ninguno de los caracteres especiales está presente
    }

};

module.exports = loginValidator;