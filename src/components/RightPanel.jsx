import React, { useState } from 'react';

const suggestedPeople = [
  { id: 1, name: 'Abdalrahman baker', role: '.net developer', img: '/Abood.png' },
  { id: 2, name: 'Suhaib al-Khalidy', role: 'Frontend developer', img: '/Abood.png' },
];

const suggestedCompanies = [
  { id: 1, name: 'Google', role: 'Tech Company', img: '/googleLogo.png' },
];

export default function RightPanel() {
  const [followedPeople, setFollowedPeople] = useState([]);
  const [followedCompanies, setFollowedCompanies] = useState([]);

  const toggleFollow = (id, list, setList) => {
    if (list.includes(id)) setList(list.filter(i => i !== id));
    else setList([...list, id]);
  };

  return (
    <div className="col-span-3 bg-gray-100 w-full my-2 hidden sticky top-20 h-fit lg:block">
      <div className="flex flex-col justify-center items-center gap-12 w-full">

        <div className="bg-white rounded-md border-gray-600 shadow-md shadow-gray-600 py-4 w-full">
          <div className="flex flex-col justify-center items-center mt-4 gap-5 w-full">
            <h1 className="text-2xl font-bold text-blue-800">Suggested for You</h1>
            {suggestedPeople.map(person => (
              <div key={person.id} className="flex justify-between items-center rounded-lg w-full p-4">
                <div className="flex items-center gap-2.5">
                  <img className="w-12 h-12 rounded-full" src={person.img} alt={person.name} />
                  <div className="font-medium">
                    <div>{person.name}</div>
                    <div className="text-sm font-normal text-gray-500">{person.role}</div>
                  </div>
                </div>
                <button onClick={() => toggleFollow(person.id, followedPeople, setFollowedPeople)}>
                  <div className={`flex justify-center items-center gap-2 rounded-full border-2 p-2 transition-all ${followedPeople.includes(person.id) ? 'bg-blue-800 border-blue-800 text-white' : 'border-blue-800 text-blue-800'}`}>
                    <span className="text-sm font-semibold">{followedPeople.includes(person.id) ? 'Following' : 'Follow'}</span>
                    <i className={`fa-solid ${followedPeople.includes(person.id) ? 'fa-check' : 'fa-plus'} text-sm`}></i>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-md border-gray-600 shadow-md shadow-gray-600 py-4 w-full">
          <div className="flex flex-col justify-center items-center mt-4 gap-5 w-full">
            <h1 className="text-2xl font-bold text-blue-800">Suggested Company</h1>
            {suggestedCompanies.map(company => (
              <div key={company.id} className="flex justify-between items-center rounded-lg w-full p-4">
                <div className="flex items-center gap-2.5">
                  <img className="w-12 h-12 rounded-full" src={company.img} alt={company.name} />
                  <div className="font-medium">
                    <div>{company.name}</div>
                    <div className="text-sm font-normal text-gray-500">{company.role}</div>
                  </div>
                </div>
                <button onClick={() => toggleFollow(company.id, followedCompanies, setFollowedCompanies)}>
                  <div className={`flex justify-center items-center gap-2 rounded-full border-2 p-2 transition-all ${followedCompanies.includes(company.id) ? 'bg-blue-800 border-blue-800 text-white' : 'border-blue-800 text-blue-800'}`}>
                    <span className="text-sm font-semibold">{followedCompanies.includes(company.id) ? 'Following' : 'Follow'}</span>
                    <i className={`fa-solid ${followedCompanies.includes(company.id) ? 'fa-check' : 'fa-plus'} text-sm`}></i>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
