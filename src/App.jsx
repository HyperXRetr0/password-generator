import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(15);
  const [addNumber, setAddNumber] = useState(true);
  const [addSpecialChar, setAddSpecialChar] = useState(true);
  const [pwd, setPwd] = useState("");

  const pwdRef = useRef(null);

  const pwdGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (addNumber) str += "1234567890";
    if (addSpecialChar) str += "!@#$%^&*()-_=+[{]}`~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPwd(pass);
  }, [length, addNumber, addSpecialChar, setPwd]);

  const copyPwd = useCallback(() => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(pwd);
  }, [pwd]);

  useEffect(() => {
    pwdGenerator();
  }, [length, addNumber, addSpecialChar, pwdGenerator]);

  return (
    <div className="max-w-lg shadow-md mx-auto mt-5 bg-slate-800 rounded-xl">
      <div className="px-5 py-10 flex flex-col gap-5">
        <div className="flex justify-center shadow-md overflow-hidden">
          <input
            type="text"
            value={pwd}
            placeholder="Password"
            className="outline-none w-full rounded-lg"
            readOnly
            ref={pwdRef}
          />
          <button
            className="text-white cursor-pointer ml-2 px-5 py-1 bg-red-500 rounded-lg hover:bg-red-800 active:bg-red-500"
            onClick={copyPwd}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center gap-5">
          <div className="flex gap-3">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white">{length}</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              defaultChecked={addNumber}
              onChange={() => {
                setAddNumber((prev) => !prev);
              }}
            />
            <label className="text-white">Numbers</label>
          </div>
          <div className="flex gap-3">
            <input
              type="checkbox"
              defaultChecked={addSpecialChar}
              onChange={() => {
                setAddSpecialChar((prev) => !prev);
              }}
            />
            <label className="text-white">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}
