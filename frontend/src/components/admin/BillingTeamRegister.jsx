// BillingRegistrationButton.js

import React, { useState } from 'react';
import BillingRegistrationModal from './BillingRegistrationModal';

const BillingTeamRegister = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                Register for Billing Team
            </button>
            {isModalOpen && <BillingRegistrationModal closeModal={closeModal} />}
        </div>
    );
};

export default BillingTeamRegister;
