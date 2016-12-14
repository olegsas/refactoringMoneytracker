// We write the constants here
const NUMBER_OF_CATEGORY_NAMES = 4;//how many names are in one category
const DATE_OF_DENOMINATION = new Date("2016-07-01");//the date of denomination, the constants
const WEEK = 7;//days in a week

function randomMoney(min, max){
    var amount = Math.floor(Math.random()*(max-min) + min);
    return amount;
}

function oneDayOfUser(){// we parse all transaction list
    var i = 1, 
    TypeA = [],// TypeA because there is an array of Type
    OperationNameA = [],// 
    AmountMinA = [],
    AmountMaxA = [],
    CurrencyA = [],
    RateA = [],// Rate[2] - is the Rate field of the transaction 2
    PeriodA = [],
    AccountA = [],
    StudentH = {},// this is the hash, {TypeH : TypeA, and so on}
    cursor = db.student.find(),
    length;
    cursor.forEach(
        function(obj){
            TypeA[i] = obj.Type;// we find certain field of the certain transaction
            OperationNameA[i] = obj.OperationName;
            AmountMinA[i] = obj.AmountMin;
            AmountMaxA[i] = obj.AmountMax;
            CurrencyA[i] = obj.Currency;
            RateA[i] = obj.Rate;
            PeriodA[i] = obj.Period;
            AccountA[i] = obj.Account;
                i++; 
        }
    );
    length = i-1;//after last cycle step i=last step+1
    StudentH = {len : length,// StudentH is a hash of transactions and the it has .len
            Type : TypeA ,
            OperationName : OperationNameA,
            AmountMin : AmountMinA,
            AmountMax : AmountMaxA,
            Currency : CurrencyA,
            Rate : RateA,
            Period : PeriodA,
            Account : AccountA}
 return StudentH;   
}

function standartDate(anyDay){// this function normalize string date into a Date object

    var anyDayA = anyDay.split("/");// we have got an array of 3 numbers in a string type
    
    var anyDATE = new Date();
        anyDATE.setFullYear(anyDayA[2]);// A means Array
        anyDATE.setMonth(anyDayA[0]-1);// we have months in range of 0...11
        anyDATE.setDate(anyDayA[1]);// anyDATE is in a correct format
        // we use format m/y/dddd

    
    return anyDATE;

}


function WriteTransaction(Date, Type, Category, Name, Amount, Currency, Account){
    //Date is in standart format
    db.transactions.insert({"Date": Date, "Type": Type, "Category": Category, "Name": Name,
                           "Amount": Amount, "Currency": Currency, "Account": Account});
}// we insert document into the collection

function WriteWallet(name, amount){
    db.wallets.insert({"name": name, "amount": amount});
}// we create wallets collection

function WriteName(name){
    db.names.insert({"name": name});
}// we create names collection

function makeMonthlyTransactions(start_Day, finish_Day, Month, Year){// we check the list of transactions and if we have a monthly one we generate a random day and make a transaction
    //there are arrays typeA[1]...typeA[length] - for every transaction
    // if we have a full month then start_Day is 1 and if we have the first month we use the start_Day
    
    for(i=1; i<StudentH.len+1; i++){// we check the transaction list
        if(
            (StudentH.Period[i] === "Month") && 
            (StudentH.Rate[i] === 1)){
        
            var transactionDay = Math.floor(Math.random()*(finish_Day - start_Day) + start_Day);
            var transaction_Date = new Date();// we convert it into an object format
            transaction_Date.setFullYear(Year);
            transaction_Date.setMonth(Month);
            transaction_Date.setDate(transactionDay);
            var transactionAmount = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount 
            // make a monthly transaction, we need to call random day
            var Number_of_the_name_of_transaction = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            // Math.random()<1 that`s why name_of_transactions<NUMBER_OF_CATEGORY_NAMES
            var operationName =  StudentH.OperationName[i]
            var transactionNameA = namesH[operationName];
            //db.names.find({"transaction":StudentH.OperationName[i]},{"names":1,_id:0}).toArray();
            // we have an object from the cursor with transactions names of the operation
            var transactionNameOnly = transactionNameA[Number_of_the_name_of_transaction];
            var transactionType = StudentH.Type[i];
            var transactionCurrency = StudentH.Currency[i];
            var transactionAccount = StudentH.Account[i];
            /*=============================*/
            // we have
            // transactionNameOnly - the name of the transaction
            // operationName - the name of operation the category of transaction
            // transactionDay - the day of the transaction
            // Month, Year - from the arguments of the function
            // Question - have I make the variables like var Month = Month?
            // transactionType - the type of the transaction
            // transactionAmount - the amount of the transaction
            // transactionCurrency - the currency of the transaction
            // transactionAccount - the account for the transaction

            
            if(transaction_Date >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date,transactionType, operationName, transactionNameOnly, 
                             transactionAmount, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date,transactionType, operationName, transactionNameOnly, 
                             transactionAmount, transactionCurrency, transactionAccount)
                }
            }
            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it
        }
    }
}

function makeTwoRandom(startDay, finishDay){
    var arr = [];
    var n;
    while(arr.length<2){
        n = Math.floor(Math.random()*(finishDay - startDay) + startDay);
        if(arr.indexOf(n) == -1){// the mistake was to use = instead of == or even ===
            arr.push(n);
        }
    }
return arr;
}

function makeThreeRandom(startDay, finishDay){
    var arr = [];
    var n;
    while(arr.length<3){
        n = Math.floor(Math.random()*(finishDay - startDay) + startDay);
        if(arr.indexOf(n) == -1){// the mistake was to use = instead of == or even ===
            arr.push(n);
        }
    }
return arr;
}

function makeSixRandom(startDay, finishDay){
    var arr = [];
    var n;
    while(arr.length<6){
        n = Math.floor(Math.random()*(finishDay - startDay) + startDay);
        if(arr.indexOf(n) == -1){// the mistake was to use = instead of == or even ===
            arr.push(n);
        }
    }
return arr;
}

function makeMonthlyTransactionsTwice(start_Day, finish_Day, Month, Year){
    for(i=1; i<StudentH.len+1; i++){// we check the transaction list
        if(
            (StudentH.Period[i] === "Month") && 
            (StudentH.Rate[i] === 2)){
        
            var transactionDays = makeTwoRandom(start_Day, finish_Day);// 
            // we have transactionDays[0] and transactionDays[1];
            var transaction_Date1 = new Date();// we convert it into an object format
            transaction_Date1.setFullYear(Year);
            transaction_Date1.setMonth(Month);
            transaction_Date1.setDate(transactionDays[0]);

            var transaction_Date2 = new Date();// we convert it into an object format
            transaction_Date2.setFullYear(Year);
            transaction_Date2.setMonth(Month);
            transaction_Date2.setDate(transactionDays[1]);
            // we have got transaction_Date1 and transaction_Date2


            var transactionAmount1 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount 
            var transactionAmount2 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            // make a monthly transaction, we need to call random day
            var Number_of_the_name_of_transaction1 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction2 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            // Math.random()<1 that`s why name_of_transactions<NUMBER_OF_CATEGORY_NAMES
            var operationName =  StudentH.OperationName[i]
            var transactionNameA = namesH[operationName];
            // we have an object from the cursor with transactions names of the operation
            var transactionNameOnly1 = transactionNameA[Number_of_the_name_of_transaction1];
            var transactionNameOnly2 = transactionNameA[Number_of_the_name_of_transaction2];

            var transactionType = StudentH.Type[i];
            var transactionCurrency = StudentH.Currency[i];
            var transactionAccount = StudentH.Account[i];
            /*=============================*/
            // we have
            // transactionNameOnly1 - the name of the transaction
            // transactionNameOnly2
            // operationName - the name of operation the category of transaction
            // transaction_Date1 - the day of the transaction
            // transaction_Date2
            // Month, Year - from the arguments of the function
            // Question - have I make the variables like var Month = Month?
            // transactionType - the type of the transaction
            // transactionAmount1 - the amount of the transaction
            // transactionAmount2
            // transactionCurrency - the currency of the transaction
            // transactionAccount - the account for the transaction

            
            if(transaction_Date1 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date1,transactionType, operationName, transactionNameOnly1, 
                             transactionAmount1, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date1 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date1,transactionType, operationName, transactionNameOnly1, 
                             transactionAmount1, transactionCurrency, transactionAccount)
                }
            }
            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

          if(transaction_Date2 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date2,transactionType, operationName, transactionNameOnly2, 
                             transactionAmount2, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date2 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date2,transactionType, operationName, transactionNameOnly2, 
                             transactionAmount2, transactionCurrency, transactionAccount)
                }
            }  
        }
    }
}

function runMonthly(startDate, finishDate){// global function runs transaction generation
    var startDATE = standartDate(startDate);
    
    var finishDATE = standartDate(finishDate);//standart Data objects
    var start_Day = startDATE.getDate();
    var start_Month = startDATE.getMonth();// month is in range 0...11
    var start_Year = startDATE.getFullYear();

    var max_day_month = new  Date(start_Year, start_Month+1, 0).getDate();// how many days in month

    var last_Day = max_day_month; // for the first month
        
    makeMonthlyTransactions(start_Day, last_Day, start_Month, start_Year);
    makeMonthlyTransactionsTwice(start_Day, last_Day, start_Month, start_Year);// we call this functions
    //to make all monthly transactions for the first month

       
        var zDATE = new Date(start_Year, start_Month, last_Day);
        zDATE.setDate(zDATE.getDate()+1);

	var cycleDATEstart,
	    cycleDATEfinish,
	    cycle_day_in_month,
	    cycleDay,
	    cycleMonth,
	    cycleYear,
	    bufferDay,
	    bufferMonth,
	    bufferYear;
	    do{
	        cycleDATEstart = zDATE;// first day of month
	        cycleDayFirst = zDATE.getDate();
	        cycleMonth = zDATE.getMonth();
	        cycleYear = zDATE.getFullYear();
	        cycle_day_in_month = new Date(cycleYear, cycleMonth+1,0).getDate();//how many days in month - OK

	        bufferDay = cycleDATEstart.getDate();
	        bufferMonth = cycleDATEstart.getMonth();
	        bufferYear = cycleDATEstart.getFullYear();
        
	        cycleDATEfinish = new Date(bufferYear, bufferMonth, bufferDay);//just now we have a clone
	        cycleDATEfinish.setDate(cycleDATEfinish.getDate()+cycle_day_in_month-1);
    
	        if(cycleDATEfinish > finishDATE){
	            makeMonthlyTransactions(cycleDayFirst, finishDATE.getDate(), cycleMonth, cycleYear);
	            makeMonthlyTransactionsTwice(cycleDayFirst, finishDATE.getDate(), cycleMonth, cycleYear);
	            //we are in the last short month
	        }
	        else{
	            makeMonthlyTransactions(cycleDayFirst, cycle_day_in_month, cycleMonth, cycleYear);
	            makeMonthlyTransactionsTwice(cycleDayFirst, cycle_day_in_month, cycleMonth, cycleYear);
	            //we work with full month
	        }
    
	        bufferDay = cycleDATEfinish.getDate();
	        bufferMonth = cycleDATEfinish.getMonth();
	        bufferYear = cycleDATEfinish.getFullYear();
        
	        zDATE = new Date(bufferYear, bufferMonth, bufferDay);//just now we have a clone 
	        zDATE.setDate(cycleDATEfinish.getDate()+1);
    	}while(cycleDATEfinish < finishDATE);
}

function DaysInYear(Year){
    var jan = new Date(Year,1,0).getDate();// getDay is the method to find the day of a week
    var feb = new Date(Year,2,0).getDate();
    var mar = new Date(Year,3,0).getDate();
    var apr = new Date(Year,4,0).getDate();
    var may = new Date(Year,5,0).getDate();
    var jun = new Date(Year,6,0).getDate();
    var jul = new Date(Year,7,0).getDate();
    var aug = new Date(Year,8,0).getDate();
    var sep = new Date(Year,9,0).getDate();
    var oct = new Date(Year,10,0).getDate();
    var nov = new Date(Year,11,0).getDate();
    var dec = new Date(Year,12,0).getDate();
    var SumDay = jan+feb+mar+apr+may+jun+jul+aug+sep+oct+nov+dec;
    return SumDay;
}

function toPlainDays(anyDate, anyMonth, anyYear){//returns tow many days between the 1-st January and the anyDATA
    // we use .getTime() method
   // var anyYear = anyDATA.getFullYear();
    var startTime = (new Date(anyYear,0,1)).getTime();//new year
    var anyDATA = new Date(anyYear, anyMonth, anyDate);
    var anyTime = anyDATA.getTime();
    var deltaTIME = anyTime - startTime;
    var plainDays = Math.floor(deltaTIME/(1000*60*60*24))+1;
    return plainDays;

}


function makeYearlyTransactionsTriple(start_Day, last_Day, Year){
    for(i=1; i<StudentH.len+1; i++){// we check the transaction list
        if(
            (StudentH.Period[i] === "Year") && 
            (StudentH.Rate[i] === 3)){
        
            var transactionDays = makeThreeRandom(start_Day, last_Day);// 
            // we have transactionDays[0] to transactionDays[2];
            var transaction_Date1 = new Date(Year, 0, transactionDays[0]);// we convert it into an object format
            
            var transaction_Date2 = new Date(Year, 0, transactionDays[1]);// we convert it into an object format
            
            var transaction_Date3 = new Date(Year, 0, transactionDays[2]);// we convert it into an object format
            
            // we have got from transaction_Date1 to transaction_Date3


            var transactionAmount1 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount 
            var transactionAmount2 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var transactionAmount3 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            // make a monthly transaction, we need to call random day
            var Number_of_the_name_of_transaction1 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction2 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction3 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            // Math.random()<1 that`s why name_of_transactions<NUMBER_OF_CATEGORY_NAMES
            var operationName =  StudentH.OperationName[i]
            var transactionNameA = namesH[operationName];
            // we have an object from the cursor with transactions names of the operation
            var transactionNameOnly1 = transactionNameA[Number_of_the_name_of_transaction1];
            var transactionNameOnly2 = transactionNameA[Number_of_the_name_of_transaction2];
            var transactionNameOnly3 = transactionNameA[Number_of_the_name_of_transaction3];

            var transactionType = StudentH.Type[i];
            var transactionCurrency = StudentH.Currency[i];
            var transactionAccount = StudentH.Account[i];
            /*=============================*/
            // we have
            // transactionNameOnly1 - the name of the transaction
            // transactionNameOnly2
            // operationName - the name of operation the category of transaction
            // transaction_Date1 - the day of the transaction
            // transaction_Date2
            // Month, Year - from the arguments of the function
            // Question - have I make the variables like var Month = Month?
            // transactionType - the type of the transaction
            // transactionAmount1 - the amount of the transaction
            // transactionAmount2
            // transactionCurrency - the currency of the transaction
            // transactionAccount - the account for the transaction

            
            if(transaction_Date1 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date1,transactionType, operationName, transactionNameOnly1, 
                             transactionAmount1, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date1 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date1,transactionType, operationName, transactionNameOnly1, 
                             transactionAmount1, transactionCurrency, transactionAccount)
                }
            }
            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

          	if(transaction_Date2 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date2,transactionType, operationName, transactionNameOnly2, 
                             transactionAmount2, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date2 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date2,transactionType, operationName, transactionNameOnly2, 
                             transactionAmount2, transactionCurrency, transactionAccount)
                }
            } 

            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

            if(transaction_Date3 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date3,transactionType, operationName, transactionNameOnly3, 
                             transactionAmount3, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date3 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date3,transactionType, operationName, transactionNameOnly3, 
                             transactionAmount3, transactionCurrency, transactionAccount)
                }
            } 

            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

		}
	}

};

function makeYearlyTransactionsSixTimes(start_Day, last_Day, Year){
    for(i=1; i<StudentH.len+1; i++){// we check the transaction list
        if(
            (StudentH.Period[i] === "Year") && 
            (StudentH.Rate[i] === 6)){
        
            var transactionDays = makeSixRandom(start_Day, last_Day);// 
            // we have transactionDays[0] to transactionDays[5];
            var transaction_Date1 = new Date(Year, 0, transactionDays[0]);// we convert it into an object format
            
            var transaction_Date2 = new Date(Year, 0, transactionDays[1]);// we convert it into an object format
            
            var transaction_Date3 = new Date(Year, 0, transactionDays[2]);// we convert it into an object format

            var transaction_Date4 = new Date(Year, 0, transactionDays[3]);// we convert it into an object format

            var transaction_Date5 = new Date(Year, 0, transactionDays[4]);// we convert it into an object format

            var transaction_Date6 = new Date(Year, 0, transactionDays[5]);// we convert it into an object format
            // we have got from transaction_Date1 to transaction_Date6


            var transactionAmount1 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount 
            var transactionAmount2 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var transactionAmount3 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var transactionAmount4 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var transactionAmount5 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var transactionAmount6 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            // make a monthly transaction, we need to call random day
            var Number_of_the_name_of_transaction1 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction2 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction3 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction4 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction5 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction6 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            // Math.random()<1 that`s why name_of_transactions<NUMBER_OF_CATEGORY_NAMES
            var operationName =  StudentH.OperationName[i]
            var transactionNameA = namesH[operationName];
            // we have an object from the cursor with transactions names of the operation
            var transactionNameOnly1 = transactionNameA[Number_of_the_name_of_transaction1];
            var transactionNameOnly2 = transactionNameA[Number_of_the_name_of_transaction2];
            var transactionNameOnly3 = transactionNameA[Number_of_the_name_of_transaction3];
            var transactionNameOnly4 = transactionNameA[Number_of_the_name_of_transaction4];
            var transactionNameOnly5 = transactionNameA[Number_of_the_name_of_transaction5];
            var transactionNameOnly6 = transactionNameA[Number_of_the_name_of_transaction6];

            var transactionType = StudentH.Type[i];
            var transactionCurrency = StudentH.Currency[i];
            var transactionAccount = StudentH.Account[i];
            /*=============================*/
            // we have
            // transactionNameOnly1 - the name of the transaction
            // transactionNameOnly2
            // operationName - the name of operation the category of transaction
            // transaction_Date1 - the day of the transaction
            // transaction_Date2
            // Month, Year - from the arguments of the function
            // Question - have I make the variables like var Month = Month?
            // transactionType - the type of the transaction
            // transactionAmount1 - the amount of the transaction
            // transactionAmount2
            // transactionCurrency - the currency of the transaction
            // transactionAccount - the account for the transaction

            
            if(transaction_Date1 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date1,transactionType, operationName, transactionNameOnly1, 
                             transactionAmount1, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date1 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date1,transactionType, operationName, transactionNameOnly1, 
                             transactionAmount1, transactionCurrency, transactionAccount)
                }
            }
            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

          	if(transaction_Date2 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date2,transactionType, operationName, transactionNameOnly2, 
                             transactionAmount2, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date2 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date2,transactionType, operationName, transactionNameOnly2, 
                             transactionAmount2, transactionCurrency, transactionAccount)
                }
            } 

            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

            if(transaction_Date3 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date3,transactionType, operationName, transactionNameOnly3, 
                             transactionAmount3, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date3 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date3,transactionType, operationName, transactionNameOnly3, 
                             transactionAmount3, transactionCurrency, transactionAccount)
                }
            } 

            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

            if(transaction_Date4 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date4,transactionType, operationName, transactionNameOnly4, 
                             transactionAmount4, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date4 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date4,transactionType, operationName, transactionNameOnly4, 
                             transactionAmount4, transactionCurrency, transactionAccount)
                }
            } 

            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

            if(transaction_Date5 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date5,transactionType, operationName, transactionNameOnly5, 
                             transactionAmount5, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date5 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date5,transactionType, operationName, transactionNameOnly5, 
                             transactionAmount5, transactionCurrency, transactionAccount)
                }
            } 

            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it

            if(transaction_Date6 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date6,transactionType, operationName, transactionNameOnly6, 
                             transactionAmount6, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date6 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date6,transactionType, operationName, transactionNameOnly6, 
                             transactionAmount6, transactionCurrency, transactionAccount)
                }
            } 

            // this 2 if-conditions checks if the denomination time, and choose the correct currency of the operation
            // use all this variables);//we write a transaction and only we need to give a random name for it
		}
	}
};

function makeWeeklyTransactions(startTimeDay, lastTimeDay){
    for(i=1; i<StudentH.len+1; i++){// we check the transaction list
    
    	if(
        	(StudentH.Period[i] === "Week") && 
            (StudentH.Rate[i] === 1)){

            var transactionTimeDay = Math.floor(Math.random()*(lastTimeDay - startTimeDay) + startTimeDay);
            var transaction_Date = new Date();
            transaction_Date.setTime(transactionTimeDay*1000*60*60*24);// Data object format
            var transactionAmount = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var Number_of_the_name_of_transaction = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var operationName =  StudentH.OperationName[i]
            var transactionNameA = namesH[operationName];
            var transactionNameOnly = transactionNameA[Number_of_the_name_of_transaction];
            var transactionType = StudentH.Type[i];
            var transactionCurrency = StudentH.Currency[i];
            var transactionAccount = StudentH.Account[i];

            if(transaction_Date >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date,transactionType, operationName, transactionNameOnly, 
                             transactionAmount, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date,transactionType, operationName, transactionNameOnly, 
                             transactionAmount, transactionCurrency, transactionAccount)
                }
            }
        }          
	}
}

function makeWeeklyTransactionsTriple(startTimeDay, lastTimeDay){
    for(i=1; i<StudentH.len+1; i++){// we check the transaction list
    	
    	if(
        	(StudentH.Period[i] === "Week") && 
            (StudentH.Rate[i] === 3)){

            var transactionTimeDays = makeThreeRandom(startTimeDay, lastTimeDay);// 
            // we have transactionTimeDays[0] to transactionTimeDays[2];
            var transaction_Date1 = new Date();
            transaction_Date1.setTime(transactionTimeDays[0]*1000*60*60*24);// Data object format
            var transaction_Date2 = new Date();
            transaction_Date2.setTime(transactionTimeDays[1]*1000*60*60*24);// Data object format
            var transaction_Date3 = new Date();
            transaction_Date3.setTime(transactionTimeDays[2]*1000*60*60*24);// Data object format
            // we have transaction_Date1...transaction_Date3

            var transactionAmount1 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var transactionAmount2 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var transactionAmount3 = randomMoney(StudentH.AmountMin[i], StudentH.AmountMax[i])//returns  amount
            var Number_of_the_name_of_transaction1 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction2 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var Number_of_the_name_of_transaction3 = Math.floor((Math.random()*NUMBER_OF_CATEGORY_NAMES));//0...NUMBER-1
            var operationName =  StudentH.OperationName[i]
            var transactionNameA = namesH[operationName];
            var transactionNameOnly1 = transactionNameA[Number_of_the_name_of_transaction1];
            var transactionNameOnly2 = transactionNameA[Number_of_the_name_of_transaction2];
            var transactionNameOnly3 = transactionNameA[Number_of_the_name_of_transaction3];
            var transactionType = StudentH.Type[i];
            var transactionCurrency = StudentH.Currency[i];
            var transactionAccount = StudentH.Account[i];

            if(transaction_Date1 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date1,transactionType, operationName, transactionNameOnly1, 
                             transactionAmount1, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date1 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date1,transactionType, operationName, transactionNameOnly1, 
                             transactionAmount1, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date2 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date2,transactionType, operationName, transactionNameOnly2, 
                             transactionAmount2, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date2 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date2,transactionType, operationName, transactionNameOnly2, 
                             transactionAmount2, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date3 >= DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byn") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date3,transactionType, operationName, transactionNameOnly3, 
                             transactionAmount3, transactionCurrency, transactionAccount)
                }
            }

            if(transaction_Date3 < DATE_OF_DENOMINATION){
                if((StudentH.Currency[i] === "Byr") || (StudentH.Currency[i] === "Usd")){
                    WriteTransaction(transaction_Date3,transactionType, operationName, transactionNameOnly3, 
                             transactionAmount3, transactionCurrency, transactionAccount)
                }
            }
        }          
	}
}

function runYearly(startDate, finishDate){// global function runs transaction generation
    var startDATE = standartDate(startDate);
    
    var finishDATE = standartDate(finishDate);//standart Data objects
    var start_Day = startDATE.getDate();
    var start_Month = startDATE.getMonth();// month is in range 0...11
    var start_Year = startDATE.getFullYear();


    var last_Day = DaysInYear(start_Year);// it will be 365 or 366

    makeYearlyTransactionsTriple(start_Day, last_Day, start_Year);
    makeYearlyTransactionsSixTimes(start_Day, last_Day, start_Year);// we call this functions
    
    var zDATE = new Date(start_Year, 0, last_Day);
        zDATE.setDate(zDATE.getDate()+1);

    var cycleDATEstart,
    cycleDATEfinish,
    cycle_day_in_year,
    cycleDay,
    cycleMonth,
    cycleYear,
    bufferDay,
    bufferMonth,
    bufferYear;

    do{
        cycleDATEstart = zDATE;// 1 jan 2011
        cycleDayFirst = zDATE.getDate();
        cycleMonth = zDATE.getMonth();
        cycleYear = zDATE.getFullYear();
        cycle_day_in_year = DaysInYear(cycleYear);// 365 or 366

        bufferDay = cycleDATEstart.getDate();
        bufferMonth = cycleDATEstart.getMonth();
        bufferYear = cycleDATEstart.getFullYear();
        
        cycleDATEfinish = new Date(bufferYear, bufferMonth, bufferDay);//just now we have a clone
        cycleDATEfinish.setDate(cycleDATEfinish.getDate()+cycle_day_in_year-1);

        if(cycleDATEfinish > finishDATE){
            makeYearlyTransactionsTriple(cycleDayFirst, toPlainDays(finishDATE.getDate(), finishDATE.getMonth(), finishDATE.getFullYear()), cycleYear);
            makeYearlyTransactionsSixTimes(cycleDayFirst, toPlainDays(finishDATE.getDate(), finishDATE.getMonth(), finishDATE.getFullYear()), cycleYear);
            //we are in the last short month
            //toPlainDays(anyDATA) returns how many days are between the 1-st January
            //and the anyDATA
        }
        else{
            makeYearlyTransactionsTriple(cycleDayFirst, cycle_day_in_year, cycleYear);
            makeYearlyTransactionsSixTimes(cycleDayFirst, cycle_day_in_year, cycleYear);
            //we work with full month
        }

        bufferDay = cycleDATEfinish.getDate();
        bufferMonth = cycleDATEfinish.getMonth();
        bufferYear = cycleDATEfinish.getFullYear();
        
        zDATE = new Date(bufferYear, bufferMonth, bufferDay);//just now we have a clone 
        zDATE.setDate(cycleDATEfinish.getDate()+1);
    }while(cycleDATEfinish < finishDATE);
}

function runWeekly(startDate, finishDate){// global function runs transaction generation
    var startDATE = standartDate(startDate);
    var startTimeDay = Math.floor(startDATE.getTime()/(1000*60*60*24));// we find a day since the zero point
    // we do not need to use start_Day, start_Month, start_Year
    // we count days from the begining of the time;
    // the next step we want to transform days into the data;
    var finishDATE = standartDate(finishDate);//standart Data objects
    var finishTimeDay = Math.floor(finishDATE.getTime()/(1000*60*60*24));
    
    var lastTimeDay = startTimeDay + WEEK - 1;// first week - we count it from the begining of the zero point

    makeWeeklyTransactions(startTimeDay, lastTimeDay);
    makeWeeklyTransactionsTriple(startTimeDay, lastTimeDay);// we call this functions for the 1-st week
    
    var zTimeDay = lastTimeDay + 1;//the first day of the next week

    var cycleTimeDaystart;
    
    do{
        cycleTimeDayStart = zTimeDay;// 1-st day of the next week
        cycleTimeDayFinish = cycleTimeDayStart + WEEK - 1;// last day of the next week
        if(cycleTimeDayFinish <= finishTimeDay){
            makeWeeklyTransactions(cycleTimeDayStart, cycleTimeDayFinish);
            makeWeeklyTransactionsTriple(cycleTimeDayStart, cycleTimeDayFinish);
            // we are in a full-time week
            // we ignore short last week
        }

        zTimeDay = cycleTimeDayFinish + 1; // 1-st day of the next next week
    
    }while(cycleTimeDayFinish < finishTimeDay);

}    

/*--------------------- this three functions run three periods of transactions - month, year, week -----------------*/

var StudentH = oneDayOfUser();// we take this array;

function runAll(begin, end){
    runYearly(begin, end);
    runMonthly(begin, end);
    runWeekly(begin, end);
}

function dataRates(){
    var ratesdbH = db.rates.find().toArray();// we accept it from the DB
    var len = ratesdbH.length;// the length of our array
    var ratesH = {};// we create a new object
    dataA = []; rateA = []; standartDateA = [];
    for(var i = 0; i<len; i++){
        dataA[i] = ratesdbH[i].date;
        //rateA[i] = ratesdbH[i].rate; there is a problem - field rate begins with a space
        standartDateA[i] = standartDate(dataA[i]);

    }
    //print("rateA[0] = "+rateA[0]);

    ratesH.data = dataA;
    //ratesH.rate = rateA;
    ratesH.standartDate = standartDateA;

    return ratesH;
}

var ratesH = dataRates();// we have all data from DB in ratesH

function findStartData(ratesH){
    var dataA = ratesH.data;// the array with string data
    var standartDateA = ratesH.standartDate; //we have the array
    var min = standartDateA[0].getTime();
    var cycleTime;
    var num = 0;
    var len = standartDateA.length;
    for(var i=0; i<len; i++){
        cycleTime = standartDateA[i].getTime();
        if (cycleTime < min){
            min = cycleTime;
            num = i;
        } 
    }
    return dataA[num];
}

function findFinishData(ratesH){
    var dataA = ratesH.data;// the array with string data
    var standartDateA = ratesH.standartDate; //we have the array
    var max = standartDateA[0].getTime();
    var cycleTime;
    var num = 0;
    var len = standartDateA.length;
    for(var i=0; i<len; i++){
        cycleTime = standartDateA[i].getTime();
        if (cycleTime > max){
            max = cycleTime;
            num = i;
        } 
    }
    return dataA[num];
}

function makeWallets(AccountA){//AccountA - is an array of accounts
    var wallets = [];
    var cycleWallet;
    var len = AccountA.length;
    for(var i = 1; i <=len ; i++){
        cycleWallet = AccountA[i];
        if(cycleWallet){
            if(wallets.indexOf(cycleWallet) == -1){// the mistake was to use = instead of == or even ===
            wallets.push(cycleWallet);
            }
        }
    }
    for(var j = 0; j<wallets.length; j++){
        WriteWallet(wallets[j],0);//start amounts = 0
    }
}// we make the wallets collection

function makeNames(OperationNameA){//OperationNameA - is an array of operation names
    var names = [];
    var cycleName;
    var len = OperationNameA.length;
    for(var i = 1; i<=len; i++){
        cycleName = OperationNameA[i];
        if(cycleName){
            if(names.indexOf(cycleName) == -1){
                names.push(cycleName);
            }
        }
    }
    for(var j = 0; j<names.length; j++){
        WriteName(names[j]);
    }
}// we make the names collection

function makeTransactionNames(){// we make names for the transaction operations
    var namesH = {
        "GroceryShopping": [ 
            "fruits", 
            "meat", 
            "vegetables", 
            "fish"
        ],
        "ClothesShopping": [
            "shirt", 
            "boots", 
            "jeans", 
            "hat"
        ],
        "Transport": [
            "bus", 
            "tram", 
            "metro", 
            "minibus"
        ],
        "Rest": [
            "cinema", 
            "cafe", 
            "football", 
            "gym"
        ],
        "Study": [
            "books", 
            "copybooks", 
            "online training", 
            "seminar"
        ],
        "HouseRent": [
            "gas", 
            "water", 
            "electricity", 
            "home telephone"
        ],
        "Utilities": [
            "toothpaste", 
            "soap", 
            "shampoo", 
            "shaving cream"
        ],
        "Internet": [
            "beltelecom", 
            "zala", 
            "damavik", 
            "hottelecom"
        ],
        "Phone": [
            "mts", 
            "velcom", 
            "life", 
            "privet"
        ],
        "PhoneAndInternet": [
            "life 3G", 
            "velcom 3G", 
            "mts 3G", 
            "privet 3G"
        ],
        "UtilitiesAndPhone": [
            "case for a phone", 
            "battery", 
            "microSD card", 
            "protective film for a phone"
        ],
        "Parents": [
            "mother", 
            "father", 
            "uncle", 
            "aunt"
        ],
        "Salary": [
            "work", 
            "hackwork", 
            "subcontractor`s work", 
            "telework"
        ]
    }
    return namesH;// we return an object with operation names
}

makeWallets(StudentH.Account);// StudentH.AccountA - is the array of the transaction accounts
//wallets is the array with single unique wallets
makeNames(StudentH.OperationName);

var namesH = makeTransactionNames();// namesH is an object with transaction names;


runAll(findStartData(ratesH), findFinishData(ratesH));//start date and final date - in my task 2016
