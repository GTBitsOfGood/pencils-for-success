import { Prisma } from '@prisma/client';

export const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

function isEmpty(input: string | undefined) {
  return typeof input === 'undefined' || input.trim().length === 0;
}

export function validateEmail(email: string | undefined) {
  if (isEmpty(email)) {
    throw Error('Please provide an email address');
  }

  // Credits - https://www.regular-expressions.info/email.html
  if (email && !emailRegex.test(email)) {
    throw Error('Please provided a valid email address');
  }
}

export function validateUsername(username: string | undefined) {
  // TODO: Add constraints to username as required
  if (isEmpty(username)) {
    throw Error('Please provide a valid username');
  }
}

export function validatePassword(password: string | undefined) {
  // TODO: Add constraints to password as required
  if (isEmpty(password)) {
    throw Error('Please provide a valid password');
  }
}

export function validatePhoneNumber(phoneNumber: string | undefined | null) {
  // TODO: Add validation constraints to phone number
}

/**
 * Checks if the provided chapter input is valid before storing in the database
 * @param chapter User input
 */
export function validateChapterInput(
  chapter: Prisma.ChapterCreateInput | undefined,
) {
  if (chapter) {
    const { chapterName, contactName, email, phoneNumber } = chapter;

    if (isEmpty(chapterName)) {
      throw Error('Please provide a valid chapter name');
    }

    if (isEmpty(contactName)) {
      throw Error('Please provide a valid chapter contact name');
    }
    validateEmail(email);
    validatePhoneNumber(phoneNumber);
  } else {
    throw Error('Please provide a valid chapter');
  }
}

/**
 * Checks if the provided user input is valid before storing in the database
 * @param chapter User input
 */
export function validateNewUserInput(user: Prisma.UserCreateInput | undefined) {
  if (user) {
    const { username, hash } = user;

    validateUsername(username);
    validatePassword(hash);
  } else {
    throw Error('Please provide a valid chapter user');
  }
}

export function validateNewSupplyRequest(
  supplyRequest: Prisma.SupplyRequestCreateInput,
) {
  if (supplyRequest) {
    const validStatus =
      supplyRequest.status !== 'PENDING' && supplyRequest.status !== 'COMPLETE';

    const validnote = supplyRequest.note && supplyRequest.note !== '';
    if (supplyRequest.quantity < 0 || validStatus || validnote) {
      throw Error('Please provide valid input fields for the supply request');
    }
  } else {
    throw Error('Please provide valid supply request');
  }
}
