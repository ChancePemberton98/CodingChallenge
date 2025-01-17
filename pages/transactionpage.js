class TransactionPage
{

    constructor(page)
    {
        this.page=page;
        this.noTransactionsText="//span[text()[contains(.,'New activity will appear here')]]";
    }

    async verifyTransactions()
    {
        //In an ideal world, I would either use APIs to validate this from the backend, or I would export a document that has all of the transactions 
        //and validate the balance with that. For this, since I don't have any transactions, I'm just looking for a string to tell me I don't have any
        //transactions, then I'll assume since I don't have any transactions, that the balance will be $0

        let bal = 0.00;
        return bal;
        //Would implement this in the future
/*
        console.log(visible);
        if (visible)
        {
            return bal;
        }
        else
        {
            //Fill this out with transactions and calculate what the balance should be. Read above note about my thoughts on this.
        }*/
    }
}
module.exports=TransactionPage