import { atom } from 'recoil';

export const POSTReservationData = atom({
  key: 'POSTReservationData', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});