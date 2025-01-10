import React, { useState } from "react";
const WalletModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet">
      <div className="space-y-6">
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-sm text-white/60">Current Balance</p>
          <p className="text-2xl font-bold text-white">$2,500.00</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3 text-white/90">Transaction History</h3>
          <div className="space-y-3">
            {[
              { date: "2024-01-05", desc: "Mentoring Session", amount: "+$150.00" },
              { date: "2024-01-03", desc: "Withdrawal", amount: "-$500.00" },
              { date: "2024-01-01", desc: "Mentoring Session", amount: "+$150.00" },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div>
                  <p className="text-white">{tx.desc}</p>
                  <p className="text-white/60 text-left">{tx.date}</p>
                </div>
                <p className={tx.amount.startsWith("+") ? "text-green-400" : "text-red-400"}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
function Wallet() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  return (
    <>
      <div>
        <button
          onClick={() => setShowWalletModal(true)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Wallet size={24} />
        </button>
      </div>
      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
    </>
  );
}

export default Wallet;
