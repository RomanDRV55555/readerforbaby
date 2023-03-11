

const getSeparatedString = (stringForSeparate = '') => {

   const vowel = 'аеєіїйуояию';                     // Голосні
   const voiced = 'бвгґджзлмнрхцчшщ';       // Дзвінкі і ширлячі
   const deaf = 'кпстф';                 // Глухі
   const brief = 'й';                                      // Й
   // const apostrophe = "'";
   const other = "ь";
   const cons = 'бвгґджзйклмнпрстфхцчшщ';

   function validateString(s = '') {
      return true;
   }

   function isNotLastSep(remainStr = '') {
      let is = false;
      for (var i = 0; i < remainStr.length; i++) {
         if (vowel.indexOf(remainStr.substr(i, 1)) !== -1) { is = true; break; }
      } // for (var i = 0; i < remainStr - 1; i++)
      return is;
   }

   function SeparatedString(s = '') {

      // Добавляем слог в массив и начинаем новый слог
      function addSep() {
         sepArr.push(tmpS);
         tmpS = '';
      } // function addSep ()
      if (!validateString(s)) {
         return s;
      }
      let tmpL = '';  // Текущий символ
      let tmpS = '';  // Текущий слог
      const sepArr = [];   // Массив слогов
      for (var i = 0; i < s.length; i++) {
         tmpL = s.substr(i, 1);
         tmpS += tmpL;
         // Проверка на признаки конца слогов
         // если буква равна 'й' и она не первая и не последняя и это не последний слог
         if (
            (i !== 0) &&
            (i !== s.length - 1) &&
            (brief.indexOf(tmpL) !== -1) &&
            (isNotLastSep(s.substr(i + 1, s.length - i + 1)))
         ) { addSep(); continue; }
         // если текущая гласная и следующая тоже гласная
         if (
            (i < s.length - 1) &&
            (vowel.indexOf(tmpL) !== -1) &&
            (vowel.indexOf(s.substr(i + 1, 1)) !== -1)
         ) { addSep(); continue; }
         // если текущая гласная, следующая согласная, а после неё гласная
         if (
            (i < s.length - 2) &&
            (vowel.indexOf(tmpL) !== -1) &&
            (cons.indexOf(s.substr(i + 1, 1)) !== -1) &&
            (vowel.indexOf(s.substr(i + 2, 1)) !== -1)
         ) { addSep(); continue; }
         // если текущая гласная, следующая глухая согласная, а после согласная и это не последний слог
         if (
            (i < s.length - 2) &&
            (vowel.indexOf(tmpL) !== -1) &&
            (deaf.indexOf(s.substr(i + 1, 1)) !== -1) &&
            (cons.indexOf(s.substr(i + 2, 1)) !== -1) &&
            (isNotLastSep(s.substr(i + 1, s.length - i + 1)))
         ) { addSep(); continue; }
         // если текущая звонкая или шипящая согласная, перед ней гласная, следующая не гласная и не другая, и это не последний слог
         if (
            (i > 0) &&
            (i < s.length - 1) &&
            (voiced.indexOf(tmpL) !== -1) &&
            (vowel.indexOf(s.substr(i - 1, 1)) !== -1) &&
            (vowel.indexOf(s.substr(i + 1, 1)) === -1) &&
            (other.indexOf(s.substr(i + 1, 1)) === -1) &&
            (isNotLastSep(s.substr(i + 1, s.length - i + 1)))
         ) { addSep(); continue; }
         // если текущая другая, а следующая не гласная если это первый слог
         if (
            (i < s.length - 1) &&
            (other.indexOf(tmpL) !== -1) &&
            ((vowel.indexOf(s.substr(i + 1, 1)) === -1) ||
               (isNotLastSep(s.substr(0, i))))
         ) { addSep(); continue; }
      } // for (var i = 0; i < s.length; i++)
      sepArr.push(tmpS);
      return sepArr.join('-');
   }

   return SeparatedString(stringForSeparate);
};

export default getSeparatedString;