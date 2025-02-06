export const queryKeys = {
  page: "strana",
  sort: "redosled",
  limit: "prikaz",
};

export const sortKeys = {
  price_asc: { label: "Cena rastuće", query: "cena_rastuce" },
  price_desc: { label: "Cena opadajuće", query: "cena_opadajuce" },
  new_asc: { label: "Novo", query: "novo" },
  new_desc: { label: "Staro", query: "staro" },
  name_asc: { label: "Naziv rastuće", query: "naziv_rastuce" },
  name_desc: { label: "Naziv opadajuće", query: "naziv_opadajuce" },
  inventory_asc: { label: "Na stanju rastuće", query: "na_stanju_rastuce" },
  inventory_desc: {
    label: "Na stanju opadajuće",
    query: "na_stanju_opadajuce",
  },
};
