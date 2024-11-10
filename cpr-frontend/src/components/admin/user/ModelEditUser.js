import { React, useState, useEffect } from 'react'
import { updateUser } from '../../../services/UserService';

export default function ModelEditUser({ isOpen, onClose, onSubmit, dataUserEdit, onEditSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  //Load data from table
  useEffect(() => {
		if (isOpen && dataUserEdit) {
      setUsername(dataUserEdit.username);
      setEmail(dataUserEdit.email);
      setPhoneNumber(dataUserEdit.phoneNumber);
      setAddress(dataUserEdit.address);
      setStatus(dataUserEdit.status);
      setPassword(dataUserEdit.password);
      setRole(dataUserEdit.role);
		}
	}, [isOpen, dataUserEdit]);

  const handleEditUser = async () => {
    let res = await updateUser(username, email, phoneNumber, address, password, role, status);
    console.log(res);
		if (res && res.status === 200) {
			alert("Update user successfully!");
			onClose();
			onEditSuccess(res);
		} else {
			alert(res.data.message || "Error when updating User");
			onClose();
		}
    setUsername('');
    setEmail('');
    setPhoneNumber('');
    setAddress('');
    setPassword('');
    setRole('');
    setStatus('');
  }

  if (!isOpen) return null;

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<form onSubmit={handleEditUser} className="space-y-6">
							<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center w-full sm:text-left">
										<h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
											Edit User
										</h3>
										<div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													Username
												</label>
												<div className="mt-2">
													<input
														id="UserName"
														name="UserName"
														value={username}
														onChange={(event) => setUsername(event.target.value)}
														type="text"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													Email
												</label>
												<div className="mt-2">
													<input
														id="Email"
														name="Email"
														value={email}
														onChange={(event) => setEmail(event.target.value)}
														type="text"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
                    <div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													Password
												</label>
												<div className="mt-2">
													<input
														id="Password"
														name="Password"
														value={password}
														onChange={(event) => setPassword(event.target.value)}
														type="text"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													PhoneNumber
												</label>
												<div className="mt-2">
													<input
														id="PhoneNumber"
														name="PhoneNumber"
														value={phoneNumber}
														onChange={(event) => setPhoneNumber(event.target.value)}
														type="text"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
										<div className="mt-2">
											<div>
												<label htmlFor="genreName" className="block text-sm font-medium leading-6 text-gray-900">
													Address
												</label>
												<div className="mt-2">
													<input
														id="Address"
														name="Address"
														value={address}
														onChange={(event) => setAddress(event.target.value)}
														type="text"
														required
														autoComplete="text"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
													/>
												</div>
											</div>
										</div>
                    <div>
											<label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
												Role
											</label>
											<div className="mt-2">
												<select
													id="Role"
													name="Role"
													value={role}
													onChange={(event) => setRole(parseInt(event.target.value))}
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
												>
													<option value="admin">Admin</option>
													<option value="user">User</option>
												</select>
											</div>
										</div>
										<div>
											<label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
												Status
											</label>
											<div className="mt-2">
												<select
													id="Status"
													name="Status"
													value={status}
													onChange={(event) => setStatus(event.target.value)}
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
												>
													<option value="Active">Active</option>
													<option value="Inactive">Inactive</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
								>
									Save
								</button>
								<button
									type="button"
									onClick={onClose}
									className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
  )
}
