export const getDataAttr = (obj: any) => {
  let ret = obj?.data || obj;

  if (Array.isArray(ret) && ret.length > 0) ret = ret.map((e: any) => e.attributes);

  if (ret?.attributes) ret = ret.attributes;

  return ret;
};
