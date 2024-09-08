module.exports = {
    'secret': 'YORE_SECRET',
    'db_conn': function(dbname) {
        // return `mongodb://mohsen1:Mdb!1360@127.0.0.1:27017/${dbname}`

       // return `mongodb://127.0.0.1:27017/${dbname}`
	  return `mongodb://localhost:27017/${dbname}?ssl=false&authSource=admin`
    },
    'defaultLanguage' : 'fa',
    'SecureCallBaseUrl' : 'https://portal.avanak.ir'
    // 'database': 'mongodb://localhost/ucab_db'
    // 'database': 'mongodb://localhost/ecabplus_test_db'
};
