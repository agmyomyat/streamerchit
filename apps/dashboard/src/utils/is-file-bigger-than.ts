export function isFileBiggerThan(file: File, limit_in_byte: number) {
  return file.size > limit_in_byte;
}
