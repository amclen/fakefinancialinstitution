import { useCallback } from "react";

import Dinero from "dinero.js";

const useFormatMoney = () => useCallback((cents) => {
    const amount = Dinero({ amount: cents, currency: "USD" })
    return amount.toFormat('$0,0.00');
}, [])

export default useFormatMoney;
