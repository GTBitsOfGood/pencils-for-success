import { Prisma } from '@prisma/client';

export const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

function isNonEmpty(input: string | undefined): input is string {
  return typeof input !== 'undefined' && input.trim().length > 0;
}

export function validateEmail(email: string | undefined) {
  if (!isNonEmpty(email)) {
    throw Error('Please provide an email address');
  }

  // Credits - https://www.regular-expressions.info/email.html
  if (email && !emailRegex.test(email)) {
    throw Error('Please provided a valid email address');
  }
}

export function validateUsername(username: string | undefined) {
  if (!isNonEmpty(username)) {
    throw Error('Please provide a valid username');
  }
  if (username.length < 6 || username.length > 30) {
    throw Error('Please provide a username of valid length');
  }

  if (username.match(/^[a-zA-Z0-9_]*$/)) {
    throw Error('Please provide an alphanumeric username');
  }
}

export function validatePassword(password: string | undefined) {
  if (!isNonEmpty(password)) {
    throw Error('Please provide a valid password');
  }
  if (password.length < 8 || password.length > 128) {
    throw Error('Please provide a password of valid length');
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

    if (!isNonEmpty(chapterName)) {
      throw Error('Please provide a valid chapter name');
    }

    if (!isNonEmpty(contactName)) {
      throw Error('Please provide a valid chapter contact name');
    }
    validateEmail(email);
    validatePhoneNumber(phoneNumber);
  } else {
    throw Error('Please provide a valid chapter');
  }
}

/**
 * Checks if the provided recipient input is valid before storing in the database
 * @param recipient Recipient input
 */
export function validateRecipientInput(
  recipient: Prisma.RecipientCreateInput | undefined,
) {
  if (recipient) {
    const { name, email, phoneNumber, location } = recipient;

    if (!isNonEmpty(name)) {
      throw Error('Please provide a valid recipient name');
    }

    if (!isNonEmpty(location)) {
      throw Error('Please provide a valid location');
    }

    validateEmail(email);
    validatePhoneNumber(phoneNumber);
  } else {
    throw Error('Please provide a valid recipient');
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
