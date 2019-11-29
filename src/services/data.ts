const readFileASync = (file: File) =>
  new Promise((resolve: (_: string) => void, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export const getValueFromInput = async (
  e: React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
  >
) => {
  switch (e.target.type) {
    case 'text':
    case 'color':
    case 'textarea':
    case 'range':
      return e.target.value
    case 'file':
      if ('files' in e.target && e.target.files) {
        return await readFileASync(e.target.files[0])
      }
      return ''
    default:
      return ''
  }
}

export default { getValueFromInput }
