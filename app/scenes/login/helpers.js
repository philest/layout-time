export function stripPhone(phone) {
  return phone.replace(/\D/g, '')
}

export function stripEmail(email) {
  return email.replace(/\s/g, '')
}


export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(stripEmail(email))
}


export function validatePhone(phone) {
  const stripped = stripPhone(phone)
  const re = /^\d+$/ // ensure numerical
  return stripped.length === 10 && re.test(stripped)
}


export function getUsernameType(username) {
  if (validatePhone(username)) {
    return 'phone'
  } else if (validateEmail(username)) {
    return 'email'
  }
  return 'unclear'
}


