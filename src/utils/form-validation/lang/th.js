export const validation = {
  email: 'รูปแแบบอีเมล์ไม่ถูกต้อง',
  required: 'ยังไม่ได้กรอกข้อมูล',
  minLength: (min) => `ต้องใส่ตัวอักษรอย่างน้อย ${min} ตัวอักษร`,
  maxLength: (max) => `ต้องใส่ตัวอักษรไม่เกิน ${max} ตัวอักษร`,
  integer: 'ต้องเป็นตัวเลขเท่านั้น',
  match: 'ค่าไม่ตรงกัน',
  oneOf: (enumeration) => `ต้องเลือกอย่างน้อย 1 ตัว ระหว่าง ${enumeration.join(', ')}`,
}