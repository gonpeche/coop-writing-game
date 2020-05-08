const submitAnswer = (payload) => {
  return {
    type: "set_answer",
    payload,
  };
};

export default { submitAnswer };
