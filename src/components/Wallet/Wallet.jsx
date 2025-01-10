import React, { useState } from "react";
import { Wallet,X } from "lucide-react";
import {motion,AnimatePresence} from "framer-motion"
const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 border border-white/20 rounded-xl p-6 w-full max-w-md relative"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
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
function WalletComponent() {
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

export default WalletComponent;
