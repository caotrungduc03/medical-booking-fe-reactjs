import { useState } from 'react';
import toast from 'react-hot-toast';
import pick from '../../utils/pick';
import { format } from 'date-fns';

const AddWorkingTimeModal = ({
  isOpenAddModal,
  handleCloseAddModal,
  handleReLoading,
  workingPlans,
}) => {
  const [workingTimeInfo, setWorkingTimeInfo] = useState({});

  const handleChange = (e) => {
    setWorkingTimeInfo({
      ...workingTimeInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/working-times`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
          body: JSON.stringify(pick(workingTimeInfo)),
        },
      );
      const result = await response.json();
      if (result.code === 201) {
        handleReLoading(true);
        handleCloseAddModal();
        e.target.reset();
        toast.success(result.message);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <div
      className={
        `modal fixed inset-0 z-99999 w-full h-full bg-black bg-opacity-60 overflow-y-auto transition-all duration-1000 ease-in-out dark:bg-white dark:bg-opacity-30 ` +
        (isOpenAddModal === true ? 'show' : '')
      }
    >
      <div className="relative max-w-4xl my-8 mx-auto">
        <div className="relative flex flex-col bg-white rounded-lg shadow dark:bg-boxdark">
          <div className="flex justify-between p-4 border-b border-[#eee] dark:border-strokedark">
            <h3 className="text-title-sm font-normal text-black dark:text-white">
              Thêm lịch ca việc mới
            </h3>
            <button onClick={handleCloseAddModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative p-4">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-base font-bold text-black dark:text-white">
                    Lịch làm việc<span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="workingPlan"
                      defaultValue={'-- Chọn --'}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {workingPlans?.map((workingPlan, index) => (
                        <option key={index} value={workingPlan.id}>
                          {workingPlan.date &&
                            format(new Date(workingPlan.date), 'dd/MM/yyyy') +
                              ' - ' +
                              workingPlan.doctor?.name +
                              ' - ' +
                              workingPlan.place}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-base font-bold text-black dark:text-white">
                    Thời gian bắt đầu <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="startTime"
                      defaultValue={'-- Chọn --'}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      <option>7:30</option>
                      <option>9:30</option>
                      <option>13:30</option>
                      <option>15:30</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-base font-bold text-black dark:text-white">
                    Thời gian kết thúc <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="endTime"
                      defaultValue={'-- Chọn --'}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      <option>9:30</option>
                      <option>11:30</option>
                      <option>15:30</option>
                      <option>17:30</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-base font-bold text-black dark:text-white">
                    Số đơn khám tối đa <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="maxSlots"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between p-4 border-t border-[#eee] dark:border-strokedark ">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-primary py-3 px-5 text-center font-medium text-primary hover:bg-opacity-90"
                onClick={handleCloseAddModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                THOÁT
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                THÊM MỚI
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWorkingTimeModal;
