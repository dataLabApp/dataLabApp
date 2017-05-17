
const pg = require('pg')
const client = new pg.Client('postgres://localhost')
const path = require('path')


var seedQuery = `INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$591.05',321,'Sales and Marketing','04/26/17'),('$712.86',324,'Research and Development','03/26/17'),('$293.35',324,'Public Relations','02/02/17'),('$718.22',319,'Advertising','07/03/16'),('$287.96',317,'Asset Management','03/09/17'),('$275.57',325,'Research and Development','06/19/16'),('$304.38',327,'Tech Support','09/09/16'),('$766.40',317,'Public Relations','09/05/16'),('$464.93',317,'Advertising','02/16/17'),('$585.90',325,'Advertising','07/27/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$280.34',326,'Tech Support','10/16/16'),('$553.56',325,'Asset Management','12/07/16'),('$443.06',324,'Advertising','10/13/16'),('$258.60',312,'Advertising','03/29/17'),('$967.42',324,'Media Relations','03/09/17'),('$203.44',321,'Legal Department','10/01/16'),('$540.29',324,'Media Relations','05/28/16'),('$482.12',323,'Payroll','09/29/16'),('$680.36',315,'Quality Assurance','05/27/16'),('$885.58',322,'Quality Assurance','04/13/17');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$335.60',314,'Research and Development','04/16/16'),('$945.86',326,'Tech Support','04/27/17'),('$709.76',327,'Sales and Marketing','07/06/16'),('$648.59',330,'Legal Department','12/13/16'),('$283.44',328,'Payroll','03/27/17'),('$997.22',327,'Payroll','07/11/16'),('$292.93',320,'Sales and Marketing','06/26/16'),('$858.35',322,'Research and Development','11/11/16'),('$908.18',326,'Public Relations','02/04/17'),('$962.15',311,'Advertising','04/25/17');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$340.02',329,'Legal Department','09/17/16'),('$501.73',318,'Payroll','05/06/16'),('$803.01',318,'Research and Development','11/06/16'),('$983.87',323,'Asset Management','06/06/16'),('$463.97',323,'Quality Assurance','05/29/16'),('$866.18',319,'Tech Support','07/10/16'),('$334.74',326,'Legal Department','07/04/16'),('$603.17',315,'Payroll','11/27/16'),('$676.60',312,'Public Relations','12/14/16'),('$725.88',326,'Public Relations','01/29/17');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$997.83',321,'Sales and Marketing','05/11/16'),('$486.78',315,'Sales and Marketing','05/07/16'),('$940.20',324,'Media Relations','06/05/16'),('$379.63',330,'Advertising','03/05/17'),('$740.12',330,'Quality Assurance','04/22/16'),('$978.45',312,'Sales and Marketing','02/19/17'),('$481.91',326,'Legal Department','04/11/17'),('$802.73',319,'Quality Assurance','11/05/16'),('$360.17',327,'Asset Management','04/11/16'),('$624.25',310,'Asset Management','08/17/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$250.09',330,'Media Relations','02/16/17'),('$689.45',322,'Quality Assurance','07/10/16'),('$283.59',311,'Quality Assurance','07/13/16'),('$232.80',316,'Advertising','04/14/17'),('$280.03',322,'Asset Management','05/23/16'),('$490.68',316,'Quality Assurance','03/06/17'),('$464.58',311,'Advertising','11/19/16'),('$699.14',312,'Payroll','02/04/17'),('$820.76',311,'Sales and Marketing','08/22/16'),('$544.21',311,'Sales and Marketing','03/07/17');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$368.21',325,'Public Relations','07/13/16'),('$563.39',313,'Legal Department','12/30/16'),('$234.59',318,'Public Relations','11/06/16'),('$859.55',330,'Advertising','04/14/16'),('$843.60',312,'Sales and Marketing','01/21/17'),('$619.41',325,'Media Relations','11/25/16'),('$992.21',327,'Research and Development','12/16/16'),('$829.53',319,'Public Relations','05/07/16'),('$726.97',324,'Legal Department','05/21/16'),('$460.85',328,'Payroll','09/03/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$400.74',315,'Research and Development','11/13/16'),('$664.31',328,'Sales and Marketing','03/12/17'),('$933.50',329,'Legal Department','12/10/16'),('$511.82',321,'Asset Management','03/07/17'),('$782.94',318,'Research and Development','03/28/17'),('$221.19',324,'Tech Support','06/15/16'),('$950.95',315,'Asset Management','08/04/16'),('$664.86',314,'Media Relations','06/11/16'),('$488.98',317,'Payroll','04/27/16'),('$216.80',321,'Asset Management','03/22/17');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$500.59',324,'Quality Assurance','02/09/17'),('$459.63',321,'Quality Assurance','09/13/16'),('$658.81',318,'Media Relations','09/01/16'),('$215.35',312,'Payroll','12/29/16'),('$368.48',322,'Sales and Marketing','02/17/17'),('$889.79',314,'Advertising','06/24/16'),('$688.10',320,'Media Relations','01/20/17'),('$595.66',321,'Research and Development','03/21/17'),('$583.53',328,'Quality Assurance','07/09/16'),('$877.27',326,'Quality Assurance','09/04/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$290.68',328,'Public Relations','11/15/16'),('$552.73',321,'Tech Support','09/28/16'),('$397.51',329,'Research and Development','09/25/16'),('$533.74',324,'Legal Department','09/03/16'),('$932.41',311,'Media Relations','07/14/16'),('$634.15',313,'Quality Assurance','02/24/17'),('$337.06',310,'Asset Management','02/24/17'),('$580.81',316,'Payroll','10/10/16'),('$406.08',317,'Asset Management','10/08/16'),('$671.46',312,'Media Relations','04/06/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$349.54',319,'Advertising','11/26/16'),('$967.73',327,'Media Relations','03/19/17'),('$280.14',328,'Quality Assurance','04/25/17'),('$936.82',329,'Asset Management','04/02/17'),('$520.13',314,'Legal Department','04/06/17'),('$992.95',325,'Advertising','11/25/16'),('$205.07',318,'Media Relations','01/30/17'),('$690.83',329,'Quality Assurance','05/13/16'),('$434.89',315,'Media Relations','09/08/16'),('$645.07',320,'Media Relations','05/13/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$670.93',312,'Tech Support','10/06/16'),('$354.07',328,'Asset Management','11/03/16'),('$580.11',326,'Tech Support','09/12/16'),('$649.81',323,'Advertising','12/11/16'),('$319.90',312,'Sales and Marketing','10/15/16'),('$844.54',314,'Advertising','11/29/16'),('$643.58',311,'Legal Department','07/13/16'),('$551.53',326,'Quality Assurance','11/18/16'),('$304.83',313,'Media Relations','02/16/17'),('$987.84',322,'Sales and Marketing','07/14/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$408.78',324,'Sales and Marketing','10/19/16'),('$605.63',310,'Quality Assurance','04/21/17'),('$451.81',326,'Quality Assurance','01/09/17'),('$694.70',314,'Sales and Marketing','04/25/16'),('$594.13',329,'Quality Assurance','10/01/16'),('$877.88',325,'Asset Management','07/24/16'),('$800.83',313,'Tech Support','01/23/17'),('$883.93',327,'Sales and Marketing','04/22/17'),('$357.39',327,'Public Relations','03/30/17'),('$263.68',324,'Research and Development','02/24/17');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$883.50',321,'Research and Development','02/26/17'),('$414.40',315,'Public Relations','02/16/17'),('$690.02',311,'Public Relations','07/20/16'),('$586.08',328,'Payroll','08/03/16'),('$900.68',322,'Asset Management','09/29/16'),('$356.01',314,'Legal Department','09/09/16'),('$699.14',318,'Media Relations','02/22/17'),('$530.67',311,'Public Relations','03/05/17'),('$200.46',324,'Media Relations','04/14/16'),('$943.25',323,'Media Relations','07/03/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$746.82',330,'Public Relations','04/15/16'),('$849.05',323,'Sales and Marketing','06/23/16'),('$219.90',330,'Quality Assurance','03/22/17'),('$985.82',325,'Research and Development','12/15/16'),('$297.84',317,'Asset Management','12/15/16'),('$998.09',325,'Advertising','05/31/16'),('$432.70',316,'Quality Assurance','03/29/17'),('$831.64',317,'Research and Development','08/18/16'),('$651.80',322,'Quality Assurance','04/29/16'),('$821.22',316,'Advertising','01/26/17');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$361.29',322,'Sales and Marketing','09/07/16'),('$328.90',322,'Media Relations','05/07/16'),('$595.90',310,'Tech Support','04/22/17'),('$921.33',319,'Payroll','03/23/17'),('$799.43',328,'Sales and Marketing','02/23/17'),('$266.06',314,'Quality Assurance','06/18/16'),('$576.82',328,'Sales and Marketing','07/13/16'),('$312.98',319,'Asset Management','06/18/16'),('$761.38',323,'Sales and Marketing','12/26/16'),('$762.17',315,'Advertising','08/21/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$438.27',310,'Legal Department','03/28/17'),('$201.20',310,'Research and Development','07/15/16'),('$205.80',326,'Research and Development','01/30/17'),('$590.29',325,'Research and Development','01/25/17'),('$308.14',327,'Payroll','09/29/16'),('$822.33',324,'Legal Department','08/21/16'),('$849.41',325,'Asset Management','07/20/16'),('$551.19',324,'Tech Support','02/02/17'),('$936.36',330,'Asset Management','12/06/16'),('$206.57',322,'Legal Department','10/21/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$358.47',326,'Tech Support','07/06/16'),('$288.40',312,'Advertising','10/09/16'),('$209.14',312,'Quality Assurance','12/20/16'),('$469.23',328,'Asset Management','12/02/16'),('$373.15',315,'Legal Department','11/02/16'),('$761.26',314,'Public Relations','09/03/16'),('$471.14',320,'Public Relations','04/22/17'),('$392.20',315,'Sales and Marketing','08/20/16'),('$506.59',325,'Advertising','07/27/16'),('$283.81',310,'Legal Department','02/17/17');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$634.50',329,'Asset Management','05/22/16'),('$669.98',330,'Tech Support','01/21/17'),('$331.28',324,'Payroll','04/10/16'),('$880.48',326,'Sales and Marketing','06/25/16'),('$307.75',319,'Quality Assurance','02/08/17'),('$565.69',315,'Public Relations','07/25/16'),('$462.04',312,'Advertising','01/22/17'),('$310.33',329,'Tech Support','04/25/17'),('$282.61',324,'Advertising','11/12/16'),('$821.70',317,'Sales and Marketing','08/11/16');
INSERT INTO "invoices" (amount,clientId,department,date) VALUES ('$243.33',329,'Quality Assurance','04/03/16'),('$881.76',314,'Quality Assurance','11/02/16'),('$525.87',325,'Quality Assurance','12/12/16'),('$222.65',317,'Tech Support','04/29/17'),('$621.35',310,'Payroll','01/05/17'),('$860.22',324,'Legal Department','07/03/16'),('$229.94',319,'Payroll','05/22/16'),('$860.47',324,'Tech Support','03/17/17'),('$284.20',310,'Public Relations','04/06/16'),('$633.37',315,'Asset Management','10/04/16')`


client.connect()

client.query('CREATE DATABASE dataLabCo', function(err, data){
  if(err)console.error(err)
  else{
    console.log('datalabco db created')
    const dlcClient = new pg.Client('postgres://localhost/datalabco')
    dlcClient.connect()

    dlcClient.query(`DROP TABLE IF EXISTS invoices`, function(err, data){
      if(err)console.error(err)
      else console.log('dropped invoices')
    })
    dlcClient.query(`CREATE TABLE invoices(id SERIAL PRIMARY KEY, amount varchar(100) default NULL, clientId integer NULL, department varchar(255) default NULL, date varchar(255))`, function(err, data){
      if(err)console.error(err)
      else{
        console.log('table created')
      }
    })
    dlcClient.query(seedQuery, function(err, data){
      if(err)console.log(err)
      else{
        console.log('looks like seeding invoices worked')
        client.end()
        dlcClient.end()
      }
    })
  }
})






// CREATE TABLE "invoices" (
//   id SERIAL PRIMARY KEY,
//   amount varchar(100) default NULL,
//   clientId integer NULL,
//   department varchar(255) default NULL,
//   date varchar(255)
// );
