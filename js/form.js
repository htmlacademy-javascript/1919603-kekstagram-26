import {resetValue} from './scale-photo.js';

const modal = document.querySelector('#upload-file');
const modalCloseButton = document.querySelector('#upload-cancel');
const modalWindow = document.querySelector('body');
export const imageUploadWindow = document.querySelector('.img-upload__overlay');

const TYPES = ['jpg', 'jpeg', 'png'];
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return TYPES.some((it) => fileName.endsWith(it));
};

const onKeyDownListener = (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement === document.querySelector('#description') || document.activeElement === document.querySelector('#hashtags')) {
      return false;
    } else {
      evt.preventDefault();
      closeUploadWindow (); // eslint-disable-line
      modal.value = '';
    }
  }
};

const openUploadWindow = () => {
  resetValue();
  imageUploadWindow.classList.remove('hidden');
  modalWindow.classList.add('modal-open');
  document.addEventListener('keydown', onKeyDownListener);
};

modalCloseButton.addEventListener('click', () => {
  closeUploadWindow (); // eslint-disable-line
});

const changeImage = () => {
  const file = modal.files[0];
  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
};

const onChangeListener = () => {
  changeImage();
  openUploadWindow ();
};

modal.addEventListener('change', onChangeListener);

export const closeUploadWindow =  () => {
  imageUploadWindow.classList.add('hidden');
  modalWindow.classList.remove('modal-open');
  modal.value = '';
  document.removeEventListener('keydown', onKeyDownListener);
  document.removeEventListener('change', onChangeListener);
};


