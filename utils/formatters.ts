export const formatPhoneNumber = (phoneNumber: string) => {
  const phoneGroups = phoneNumber.match(
    /(\d{3})(\d{3})(\d{4})/
  ) as RegExpMatchArray;
  return "(" + phoneGroups[1] + ") " + phoneGroups[2] + "-" + phoneGroups[3];
};
