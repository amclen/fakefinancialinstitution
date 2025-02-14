import { useCallback } from "react";

const useFormatAccountId = () => useCallback((id) => String(id).padStart(9, '0'), [])

export default useFormatAccountId;
