namespace Streaming.Publishers
{
    public interface IDataFactory<TData>
    {
        TData Create(string dataId);
    }
}
