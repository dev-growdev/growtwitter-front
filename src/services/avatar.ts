import { ref } from 'vue';

const previewAvatar = ref<string | undefined>(undefined);

function useAvatar() {
  function loadFileToPreview(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target !== null) {
        previewAvatar.value = e.target.result?.toString();
      }
    };
    fileReader.readAsDataURL(file);
    return file;
  }

  return { previewAvatar, loadFileToPreview };
}

export default useAvatar;
