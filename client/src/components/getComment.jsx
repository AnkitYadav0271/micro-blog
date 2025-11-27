export const GetComment = ({ comments }) => {
  console.log("comment", comments);

  return (
    <div className="container my-4">
      {/* Heading first */}
      <h4 className="mb-3">Comments</h4>

      {/* Comments below */}
      <ul className="row">
        {comments?.map((comm) => (
          <li key={comm.id} className="col-12 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <p className="card-text">
                  {comm.type === "rejected" ? "Rejected comment" : comm.comment}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
