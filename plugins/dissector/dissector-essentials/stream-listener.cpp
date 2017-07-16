#include <nan.h>
#include <plugkit/listener.hpp>

using namespace plugkit;

class StreamListener : public Listener {
public:
  bool analyze(const FrameView *frame) override;
};

bool StreamListener::analyze(const FrameView *frame) { return true; }

class StreamListenerFactory : public ListenerFactory {
public:
  ListenerPtr create(const SessionContext &context) const override;
};

ListenerPtr StreamListenerFactory::create(const SessionContext &context) const {
  return ListenerPtr(new StreamListener());
}

void Init(v8::Local<v8::Object> exports) {
  exports->Set(
      Nan::New("factory").ToLocalChecked(),
      ListenerFactory::wrap(std::make_shared<StreamListenerFactory>()));
}

NODE_MODULE(dissectorEssentials, Init);