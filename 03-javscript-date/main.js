var today = "09/11/2022";
var products = [
  {
    productionDate: "2022-01-01",
    expiredDate: "10/06/2023",
  },
  {
    productionDate: "2022-02-14",
    expiredDate: "17/08/2022",
  },
];

function formatDate(arg) {
  const date = arg.split("/");

  if (date.length > 1) {
    return new Date(`${date[2]}-${date[1]}-${date[0]}`);
  }
  return new Date(arg);
}

function getformatDate(dateOne, dateTwo) {
  return (dateOne.getTime() - dateTwo.getTime()) / (1000 * 3600 * 24);
}

const productsInfo = products.map((product) => {
  const expiredIn = getformatDate(formatDate(product.expiredDate), formatDate(today));
  return {
    productionDate: product.productionDate,
    expiredDate: product.expiredDate,
    shelfLife: getformatDate(formatDate(product.expiredDate), formatDate(product.productionDate)),
    age: getformatDate(formatDate(today), formatDate(product.productionDate)),
    expiredIn,
    isExpired: expiredIn < 0 ? true : false,
  };
});

console.log(productsInfo);

var productDetailsMoment = products.map((product) => {
  const {productionDate, expiredDate} = product

  var mToday = moment(today, 'DD/MM/YYYY')
  var mProductionDate = moment(product.productionDate, 'DD/MM/YYYY')
  var mExpiredDate = moment(product.expiredDate, 'DD/MM/YYYY')
  return {
    productionDate,
    expiredDate,
    shelfLife : mExpiredDate.diff(mExpiredDate, 'days'),
    age: mToday.diff(mProductionDate, 'days'),
    expiredIn: mExpiredDate.diff(mToday, 'days'),isExpired:mExpiredDate.diff(mToday, 'days') < 0
  }
})

console.log('product moment', productDetailsMoment)