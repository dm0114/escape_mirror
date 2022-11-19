import { atom } from 'recoil';

export const POSTReservationData = atom({
  key: 'POSTReservationData', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const LayoutData = atom({
  key: 'LayoutData', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const ReviewIdData = atom({
  key: '',
  default:0,
})