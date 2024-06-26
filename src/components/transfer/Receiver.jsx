const Receiver = ({ receiver }) => {
  return (
    <div className="flex items-center justify-between w-full h-[100px] bg-white rounded-[10px] shadow p-5">
      <div className="flex items-center">
        <div
          className="flex size-[70px] rounded-[10px] bg-cover bg-center bg-no-repeat mr-5"
          style={{
            backgroundImage: `url(${receiver.photo_profile})`,
          }}
        ></div>
        <div>
          <div className="text-lg font-bold mb-[10px]">{receiver.name}</div>
          <div className="text-[#7A7886]">{receiver.phone_number}</div>
        </div>
      </div>
    </div>
  );
};

export default Receiver;
